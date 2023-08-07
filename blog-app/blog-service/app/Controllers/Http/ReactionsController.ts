import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ReactionsController {
    public async add({ params, request }: HttpContextContract) {
    try {
        const body = await request.validate(AddFavoriteArticle);
        const { userId, articleId } = body;

        // for owner of blog info so we can get owner name and then show the owner name in notification
        const user = await User.findBy("id", body.ownerId);
        
        await FavoriteArticle.create({articleId, userId});
        return { 
            data: body, 
            message: `Blog by ${user?.username} added to favorite list successfully!` 
        };
    
    } catch (e) {
      throw e;
    }
  }
}
