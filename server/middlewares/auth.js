 

 //Middleware to check user id and check hasPremiumPlan or not
 import { clerkClient } from "@clerk/express";

 // Middleware to check userId and hasPremiumPlan
 export const auth = async (req, res, next)=>{
     try {
         const {userId, has} = await req.auth();
         const hasPremiumPlan = await has({plan: 'premium'});
 
         const user = await clerkClient.users.getUser(userId);
 
         if(!hasPremiumPlan && user.privateMetadata.free_usage){
             req.free_usage = user.privateMetadata.free_usage
         } else {
            clerkClient.users.updateUserMetadata(userId , {
                privateMetadata: {
                    free_usage: 0
                }
            })
            req.free_usage = 0;
         }

         req.plan = hasPremiumPlan ? 'Premium' : 'Free';
         next;
     } catch (error) {
         res.json({success: false, message: error.message })
     }
 }
 