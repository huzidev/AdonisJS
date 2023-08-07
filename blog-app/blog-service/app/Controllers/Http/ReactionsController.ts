import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Reaction from 'App/Models/Reaction';
import User from 'App/Models/User';
import { AddReaction } from 'App/Validators/ReactionValidator';

export default class ReactionsController {
    public async add({ request }: HttpContextContract) {
    try {
        const body = await request.validate(AddReaction);
        const { userId, articleId } = body;

        // for owner of blog info so we can get owner name and then show the owner name in notification
        const user = await User.findBy("id", userId);
        
        let isLike;
        let isDislike;
        if (body.isLike) {
            isLike = true;
            isDislike = false;
        } else if (body.isDislike) {
            isLike = false;
            isDislike = true;
        }

        await Reaction.create({articleId, userId, isLike, isDislike});
        return { 
            data: body, 
            message: `You've liked blog by ${user?.username}` 
        };
    
    } catch (e) {
      throw e;
    }
  }
}
