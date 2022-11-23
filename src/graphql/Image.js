import gql from 'graphql-tag';

export const getImages = gql`
	query getImages {
		images {
			id
			name
			created_at
		}
	}
`;

export const createImage = gql`
	mutation createImage($name: String!, $projectId: String!, $createdAt: String!) {
		createImage(name: $name, project_id: $projectId, created_at: $createdAt) {
			id
			name
            project_id
			created_at
		}
	}
`;

export const createFile = gql`
	mutation createFile($picture: Upload!) {
		createFile(picture: $picture)
	}
`;
