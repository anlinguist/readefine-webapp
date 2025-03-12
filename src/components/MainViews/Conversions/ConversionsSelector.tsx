import { Helmet } from "react-helmet-async"
import ConversionsHome from "./ConversionsHome";
import ConversionCategoriesList from "./ConversionCategoriesList";

function ConversionsSelector() {

  return (
    <div id="community_dictionaries" className="checkedbyreadefine row">
      <Helmet>
        <title>Conversions</title>
      </Helmet>
      
      <ConversionCategoriesList />
      <ConversionsHome />
    </div>
  )
}

export default ConversionsSelector