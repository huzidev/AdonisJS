import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Reaction from "App/Models/Reaction";
import User from "App/Models/User";
import { AddReaction } from "App/Validators/ReactionValidator";

export default class ReactionsController {
  public async add({ request }: HttpContextContract) {
    try {
      const body = await request.validate(AddReaction);
      const { articleId, userId, isLike, isDislike } = body;

      // for owner of blog info so we can get owner name and then show the owner name in notification
      const user = await User.findBy("id", userId);

      let reaction: any = await Reaction.query()
        .where("userId", userId)
        .where("articleId", articleId)
        .first();

      // so when user clicked on like or dislike for first time add values in columns and WHEN values are added then we'll call reaction.save() to get latest data
      // otherwise every time it'll create new column with new values instead of updating the same column
      if (!reaction) {
        reaction = await Reaction.create({
          ...body,
        });
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
        message: `You've ${isLike ? "Liked" : "Disliked"} blog by ${
          user?.username
        }`,
      };
    } catch (e) {
      throw e;
    }
  }

  public async getReactions({ params }: HttpContextContract) {
    try {
        const likes = await Database.from('reactions')
        .where('article_id', params.id)
        .where('is_like', true)
        .count('* as totalLikes')
        .first();

        const dislikes = await Database.from('reactions')
        .where('article_id', params.id)
        .where('is_dislike', true)
        .count('* as totalDislikes')
        .first();
      
      return {
        message: "Reactions fetched successfully",
        data: { likes, dislikes },
      };
    } catch (e) {
      throw e;
    }
  }
}
