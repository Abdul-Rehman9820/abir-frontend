

import Single_Pdf from '../recipe_pdf_comp/single_pdf'


export default function Recipe_Slug({params}) {

    var recipe_pdf_slug = params.recipe_pdf_slug;

    return (
        <div className="shop-details-area py-14">
            <div className="container mx-auto">

               <Single_Pdf recipe_pdf_slug={recipe_pdf_slug} />

            </div>
        </div>

    )
}
