import {
	ReactiveBase,
	ResultList,
	SelectedFilters,
	DataSearch,
	ReactiveList,
} from '@appbaseio/reactivesearch';
import * as React from 'react';

import './index.css';

export default () => (
	<ReactiveBase
		app="good-books-ds"
		url="https://1e47b838a035:767b5a1a-03cb-4c5f-a536-4f399c24134b@arc-cluster-appbase-tryout-k8dsnj.searchbase.io"
		enableAppbase
	>
		<div className="row">
			<div className="col">
				<DataSearch
					dataField="original_title"
					componentId="BookSensor"
					defaultValue="Artemis Fowl"
				/>
			</div>

			<div className="col">
				<SelectedFilters />
				<ReactiveList
					componentId="SearchResult"
					dataField="original_title"
					size={3}
					className="result-list-container"
					pagination
					react={{
						and: 'BookSensor',
					}}
					render={({ data }) => (
						<ReactiveList.ResultListWrapper>
							{data.map((item: any) => (
								<ResultList key={item._id}>
									<ResultList.Image src={item.image} />
									<ResultList.Content>
										<ResultList.Title>
											<div
												className="book-title"
												dangerouslySetInnerHTML={{
													__html: item.original_title,
												}}
											/>
										</ResultList.Title>
										<ResultList.Description>
											<div className="flex column justify-space-between">
												<div>
													<div>
														by{' '}
														<span className="authors-list">
															{item.authors}
														</span>
													</div>
													<div className="ratings-list flex align-center">
														<span className="stars">
															{Array(item.average_rating_rounded)
																.fill('x')
																.map((
																	item, // eslint-disable-line
																	index,
																) => (
																	<i
																		className="fas fa-star"
																		key={index} // eslint-disable-line
																	/>
																))}
														</span>
														<span className="avg-rating">
															({item.average_rating} avg)
														</span>
													</div>
												</div>
												<span className="pub-year">
													Pub {item.original_publication_year}
												</span>
											</div>
										</ResultList.Description>
									</ResultList.Content>
								</ResultList>
							))}
						</ReactiveList.ResultListWrapper>
					)}
				/>
			</div>
		</div>
	</ReactiveBase>
);
