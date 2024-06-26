'use server';

import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';
import Story from '@/models/Story';
import { fileUploader } from './fileUploader';
import User from '@/models/User';
import { revalidateTag } from 'next/cache';

// Utils functions
const modifiedObject = (array) => {
    const modifiedData = array.map((o) => ({
        ...o,
        _id: o._id.toString()
    }));
    return modifiedData;
};

// Connect to the database
connectDB();

// Get All Posts
const getPosts = async (limit, skip) => {
    try {
        const posts = await Post.find()
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .sort({ date: -1 });

        const modifiedPosts = posts.map((post) => ({
            ...post.toObject(),
            _id: post._id.toString()
        }));

        return modifiedPosts;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Create a new post
const createPost = async (formData) => {
    try {
        // Image Upload
        const { secure_url, public_id } = await fileUploader(
            formData.photo.get('image'),
            'Images/Posts'
        );
        // Add the new post
        const newPost = {
            userId: formData.userId,
            description: formData.description,
            postImage: {
                photoUrl: secure_url,
                publicId: public_id
            }
        };

        await Post.create(newPost);
    } catch (err) {
        throw new Error(err);
    }

    return { success: true };
};

// Post Comment
const postComment = async (comment, id) => {
    try {
        // Find the post by ID
        const post = await Post.findById(id);

        // Check if the post exists
        if (!post) {
            throw new Error('Post not found');
        }

        // Add the comment to the post
        post.comments.push(comment);

        // Save the post
        await post.save();
        // Return the updated post
        return { success: true, message: 'Comment SuccessFully' };
    } catch (error) {
        // If any error occurs, throw an error
        throw new Error(error.message);
    }
};

// Post Reaction
const postReaction = async (postReaction, id) => {
    // Function to handle existing reaction
    const handleExistingReaction = (post, postReaction, existingReactionIndex) => {
        if (post.reactions[existingReactionIndex].reactionType === postReaction.reactionType) {
            // If the reaction type is the same as the existing one, delete the existing reaction
            deleteExistingReaction(post, existingReactionIndex);
        } else {
            // Update the existing reaction
            updateExistingReaction(post, postReaction, existingReactionIndex);
        }
    };

    // Function to delete existing reaction
    const deleteExistingReaction = (post, existingReactionIndex) => {
        // Remove the existing reaction
        post.reactions.splice(existingReactionIndex, 1);
    };

    // Function to update existing reaction
    const updateExistingReaction = (post, postReaction, existingReactionIndex) => {
        const restReactions = post.reactions.filter((r, index) => index !== existingReactionIndex);

        // Replace the existing reaction with the new one
        post.reactions = [...restReactions, postReaction];
    };

    // Function to add new reaction
    const addNewReaction = (post, postReaction) => {
        // Add the new reaction
        post.reactions.push(postReaction);
    };

    try {
        // Find the post by ID
        const post = await Post.findById(id);

        // Check if the post exists
        if (!post) {
            throw new Error('Post not found');
        }

        // Extract email from the post reaction
        const { email } = postReaction;

        // Check if the user has already reacted to the post
        const existingReactionIndex = post.reactions.findIndex((r) => r.email === email);

        // Handle existing reaction
        if (existingReactionIndex !== -1) {
            handleExistingReaction(post, postReaction, existingReactionIndex);
        } else {
            // Add new reaction
            addNewReaction(post, postReaction);
        }

        // Save the updated post with the new reaction
        await post.save();

        // Return success response
        return { success: true };
    } catch (error) {
        // If any error occurs, throw an error
        throw new Error(error.message);
    }
};

// Get All Stories
const getStories = async (limit, skip) => {
    try {
        const stories = await Story.find()
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .sort({
                createdAt: -1
            })
            .lean();

        // Find the users corresponding to the userIds
        const users = await User.find()
            .select({
                email: 1,
                name: 1,
                image: 1,
                _id: 1
            })
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .sort({
                createdAt: -1
            })
            .lean();

        // Modified Data
        const modifiedStories = modifiedObject(stories);
        const modifiedUsers = modifiedObject(users);

        const allStories = modifiedStories.map((story) => {
            const user = modifiedUsers.find((user) => user._id === story.userId);
            if (user) {
                const { _id, ...userData } = user;
                return { ...story, ...userData };
            }
            return story;
        });

        return allStories;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Create a new story
const createStory = async ({ photo, userId }) => {
    try {
        // Image Upload
        const { secure_url, public_id } = await fileUploader(photo.get('image'), 'Stories');

        // Add the new story
        const newStory = {
            userId,
            storyImage: {
                photoUrl: secure_url,
                publicId: public_id
            }
        };
        await Story.create(newStory);
    } catch (err) {
        throw new Error(err);
    }

    // Revalidate the page
    revalidateTag('stories');

    return { success: true };
};

export { getPosts, createPost, postComment, postReaction, getStories, createStory };
