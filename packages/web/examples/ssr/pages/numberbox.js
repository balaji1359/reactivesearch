/* eslint-disable */
import React, { Component } from 'react';
import { ReactiveBase, NumberBox, SelectedFilters, ReactiveList } from '@appbaseio/reactivesearch';

import initReactivesearch from '@appbaseio/reactivesearch/lib/server';

import Layout from '../components/Layout';
import BookCard from '../components/BookCard';

const settings = {
	app: 'good-books-ds',
	url: 'https://1e47b838a035:767b5a1a-03cb-4c5f-a536-4f399c24134b@arc-cluster-appbase-tryout-k8dsnj.searchbase.io',
	enableAppbase: true,
};

const numberBoxProps = {
	componentId: 'BookSensor',
	dataField: 'average_rating_rounded',
	data: {
		label: 'Book Rating',
		start: 2,
		end: 5,
	},
	showFilter: false,
	defaultValue: 3,
};

const reactiveListProps = {
	componentId: 'SearchResult',
	dataField: 'original_title.keyword',
	className: 'result-list-container',
	from: 0,
	size: 5,
	renderItem: data => <BookCard key={data._id} data={data} />,
	react: {
		and: ['BookSensor'],
	},
};

export default class Main extends Component {
	static async getInitialProps() {
		return {
			store: await initReactivesearch(
				[
					{
						...numberBoxProps,
						source: NumberBox,
					},
					{
						...reactiveListProps,
						source: ReactiveList,
					},
				],
				null,
				settings,
			),
		};
	}

	render() {
		return (
			<Layout title="SSR | NumberBox">
				<ReactiveBase {...settings} initialState={this.props.store}>
					<div className="row">
						<div className="col">
							<NumberBox {...numberBoxProps} />
						</div>

						<div className="col">
							<SelectedFilters />
							<ReactiveList {...reactiveListProps} />
						</div>
					</div>
				</ReactiveBase>
			</Layout>
		);
	}
}
