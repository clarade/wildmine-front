import gql from 'graphql-tag';

export const getOrganizations = gql`
	query getOrganizations {
		Organizations {
			id
			name
			description
		}
	}
`;

export const getOrganizationById = gql`
	query getOrganizationById($id: Float!) {
		getOrganizationById(id: $id) {
			id
			name
			description
		}
	}
`;

export const createOrganization = gql`
	mutation createOrganization($name: String!, $description: String!) {
		createOrganization(name: $name, description: $description) {
			id
			name
			description
		}
	}
`;
