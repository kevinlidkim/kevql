import { GraphQLString, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLSchema } from 'graphql';
import Authors from './data/authors';
import Posts from './data/posts';
import _ from 'lodash';

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	description: 'This represents an Author',
	fields: () => ({
		id: {type: new GraphQLNonNull(GraphQLString)},
		name: {type: new GraphQLNonNull(GraphQLString)},
		twitterHandle: {type: GraphQLString}
	})
});

const PostType = new GraphQLObjectType({
	name: 'Post',
	description: 'This represents a Post',
	fields: () => ({
		id: {type: new GraphQLNonNull(GraphQLString)},
		title: {type: new GraphQLNonNull(GraphQLString)},
		body: {type: GraphQLString},
		author: {
			type: AuthorType,
			resolve: function(post) {
				return _.find(Authors, a => a.id === post.author_id)
			}
		}
	})
});

const BlogQueryRootType = new GraphQLObjectType({
	name: 'BlogAppSchema',
	description: 'Blog Application Schema Query Root',
	fields: () => ({
		authors: {
			type: new GraphQLList(AuthorType),
			description: 'List of all Authors',
			resolve: function() {
				return Authors
			}
		},
		posts: {
			type: new GraphQLList(PostType),
			description: 'List of all Posts',
			resolve: function() {
				return Posts
			}
		}
	})
});

const BlogAppSchema = new GraphQLSchema({
	query: BlogQueryRootType
});

module.exports = BlogAppSchema;