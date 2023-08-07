import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Reaction from 'App/Models/Reaction';
import User from 'App/Models/User';
import { AddReaction } from 'App/Validators/ReactionValidator';

export default class ReactionsController {
    public async add({ params, request }: HttpContextContract) {
    try {
        const body = await request.validate(AddReaction);
        const { userId, articleId } = body;

        // for owner of blog info so we can get owner name and then show the owner name in notification
        const user = await User.findBy("id", userId);
        
        await Reaction.create({articleId, userId});
        return { 
            data: body, 
            message: `Blog by ${user?.username} added to favorite list successfully!` 
        };
    
    } catch (e) {
      throw e;
    }
  }
}
