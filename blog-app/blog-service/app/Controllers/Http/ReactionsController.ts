import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Reaction from 'App/Models/Reaction';
import User from 'App/Models/User';
import { AddReaction } from 'App/Validators/ReactionValidator';

export default class ReactionsController {
    public async add({ request }: HttpContextContract) {
    try {
        const body = await request.validate(AddReaction);
        const { userId, articleId, isLike, isDislike } = body;

        // const reaction = new Reaction();
        let reaction = await Reaction.findBy("userId", userId);

        // for owner of blog info so we can get owner name and then show the owner name in notification
        const user = await User.findBy("id", userId);

        if (!reaction) {
            await Reaction.create({ ...body })
        } else {
            await reaction.save();
        }

        
        // reaction.articleId = articleId;
        // reaction.userId = userId;

        // if (isLike) {
        //     reaction.isLike = true;
        //     reaction.isDislike = false;
        // } else if (isDislike) {
        //     reaction.isLike = false;
        //     reaction.isDislike = true;
        // }
        // // await reaction.save();

        return { 
            data: body, 
            message: `You've liked blog by ${user?.username}` 
        };
    
    } catch (e) {
      throw e;
    }
  }
}
