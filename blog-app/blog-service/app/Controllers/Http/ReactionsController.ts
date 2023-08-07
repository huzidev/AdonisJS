import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Reaction from 'App/Models/Reaction';
import User from 'App/Models/User';
import { AddReaction } from 'App/Validators/ReactionValidator';

export default class ReactionsController {
    public async add({ request }: HttpContextContract) {
    try {
        const body = await request.validate(AddReaction);
        const { userId, isLike, isDislike } = body;

        // const reaction = new Reaction();
        let reaction = await Reaction.findBy("userId", userId);

        // for owner of blog info so we can get owner name and then show the owner name in notification
        const user = await User.findBy("id", userId);

        // so when user clicked on like or dislike for first time add values in columns and WHEN values are added then we'll call reaction.save() to get latest data
        // otherwise every time it'll create new column with new values instead of updating the same column
        if (!reaction) {
            await Reaction.create({ ...body })
        } else {
            if (isLike) {
                reaction.isLike = true;
                reaction.isDislike = false;
            } else if (isDislike) {
                reaction.isLike = false;
                reaction.isDislike = true;
            }
            await reaction.save();
        }
        
        return { 
            data: body, 
            message: `You've liked blog by ${user?.username}` 
        };
    
    } catch (e) {
      throw e;
    }
  }

  public async getReactions({ params }: HttpContextContract) {
    try {
        // const response = await Reaction.findBy("articleId", params.id);
        const response = await Reaction.query().count("id").where("articleId", params.id);
        console.log("Response", response);
        
        return {
            message: "Reactions fetched successfully",
            data: response
        }
    } catch (e) {
        throw e;        
    }

  }
}
