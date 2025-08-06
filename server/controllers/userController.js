import sql from "../configs/db.js";
// This is the correct version
import { auth } from '../middlewares/auth.js';

export const getUserCreations = async (req, res) => {
    try {
        const { userId } = req.auth();
        const creations = await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;
        res.json({ success: true, creations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getPublishedCreations = async (req, res) => {
    try {
        // Note: This function doesn't use userId, it gets all public creations.
        const creations = await sql`SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;
        res.json({ success: true, creations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const toggleLikeCreations = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { id } = req.body; // The ID of the creation to like

        const [creation] = await sql`SELECT * FROM creations WHERE id = ${id}`;

        if (!creation) {
            return res.status(404).json({ success: false, message: "Creation not found" });
        }

        // Use || [] as a fallback in case the likes array is null in the database
        const currentLikes = creation.likes || [];
        const userIdStr = userId.toString();
        let updatedLikes;
        let message;

        if (currentLikes.includes(userIdStr)) {
            // User has already liked it, so we unlike it.
            updatedLikes = currentLikes.filter((user) => user !== userIdStr);
            message = 'Creation Unliked';
        } else {
            // User has not liked it, so we add their like.
            updatedLikes = [...currentLikes, userIdStr];
            message = 'Creation Liked';
        }

        // 1. Define formattedArray *before* using it.
        const formattedArray = `{${updatedLikes.join(',')}}`;
        
        // 2. Update the database with the new likes array.
        await sql`UPDATE creations SET likes = ${formattedArray}::text[] WHERE id = ${id}`;

        // 3. Send a success response. The extra query to get all creations was removed.
        res.json({ success: true, message });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
