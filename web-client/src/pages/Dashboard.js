import React from 'react';

import { useQuery } from '@apollo/client';
import { userWithRelations } from '../graphql/UserSession';

import DisplayAttachedProjects from './components/dashboard/DisplayAttachedProjects';
import DisplayDashboardTitleIssues from './components/dashboard/DisplayDashboardTitleIssues';
import DisplayIssuesValues from './components/issues/DisplayIssuesValues';
import Diagram from './components/dashboard/Diagram';

const Dashboard = ({ actualUser }) => {
	const { loading, error, data } = useQuery(userWithRelations);

	console.log(data);

	if (loading)
		return (
			<div className="flex justify-center">
				<svg
					role="status"
					className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor"
					/>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentFill"
					/>
				</svg>
			</div>
		);

	if (error) return `Error! ${error.message}`;

	return (
		<div className="dashboard-container">
			{actualUser ? (
				<>
				<div className="">
					<div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
						<div className="grid grid-cols-1 col-span-3 m-4">
							<div className="max-w-sm rounded overflow-hidden shadow-lg bg-secondary_color">
								<div className='p-4'>
								<Diagram />
								</div>
								<div className="p-4">
									{/* <img className="w-full" src={diagram} alt="diagram" /> */}
									<div className="font-bold text-xl mb-2 font-chaney_title text-md text-center">
										Résumé de mes tickets
									</div>
									<div className="px-6 py-4">
										<div className="grid grid-cols-2 p-4">
											<div>
												<p className="text_color_light">Non traités ()</p>
												<p className="text_color_light">En cours ()</p>
												<p className="text_color_light">Résolus ()</p>
											</div>
											<div>
												<p className="text_color_light">Nombre de tickets résolus depuis (date)</p>
												<div className="font-chaney_title text-center"> ...</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-1 col-span-3 m-4">
							<p className="font-bold text-xl mb-2 text_color_light font-chaney_title divide-y divide-solid">
								Projets auxquels je suis rattaché
							</p>
							<div className="relative overflow-x-auto shadow-md sm:rounded-lg text-center">
								<DisplayAttachedProjects />
							</div>
							{data.userWithRelations.project_assigned.map((project) => {
								return (
									<div className="grid grid-cols-3 p-4 text-center">
										<p>{project.name}</p>
										<p>{project.description}</p>
										<p>{project.created_at}</p>
									</div>
								);
							})}
						</div>

						<div className="col-span-3 sm:col-span-6">
							<p className="font-bold text-xl text_color_light mt-8 mb-12 font-chaney_title">
								Derniers tickets traités
							</p>
							<div className="my-4">
								<DisplayDashboardTitleIssues />

								<div>
									{data.userWithRelations.issues_assigned ? (
										data.userWithRelations.issues_assigned.map((issue, issueIndex) => (
											<DisplayIssuesValues
												key={issueIndex}
												issue={issue}
												issueIndex={issueIndex}
												issues={data.userWithRelations.issues_assigned}
											/>
										))
									) : (
										<p>Aucun ticket ne vous est assigné pour le moment</p>
									)}
								</div>
							</div>
						</div>
					</div>
					</div>
				</>
			) : (
				<>Pas de données pour le moment! :'(</>
			)}
		</div>
	);
};

export default Dashboard;
