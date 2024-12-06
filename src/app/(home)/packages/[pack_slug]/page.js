

import Single_Pack from '../pack_comp/single_pack'


export default function Recipe_Slug({params}) {

    var pack_slug = params.pack_slug;

    return (
        <div className="shop-details-area py-14">
            <div className="container mx-auto">

               <Single_Pack pack_slug={pack_slug} />

            </div>
        </div>

    )
}
