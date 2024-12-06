

import Single_video from '../recipe_video_comp/single_video'


export default function Recipe_VideoSlug({params}) {

    var recipe_video_slug = params.recipe_video_slug;

    return (
        <div className="shop-details-area py-14">
            <div className="container mx-auto">

               <Single_video recipe_video_slug={recipe_video_slug} />

            </div>
        </div>

    )
}
