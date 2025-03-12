import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { RDFNContext } from "../../../RDFNContext";
import { useAuth } from "../../../contexts/AuthContext";
import { Group, Title } from "@mantine/core";
import BackToDictionaries from "../../Buttons/BackToDictionaries";
import ConversionsList from "./ConversionsList";
import ConversionCategoriesList from "./ConversionCategoriesList";

function Conversions() {
    // @ts-expect-error TS(2339): Property 'conversionCategories' does not exist on type 'RDFNContextType'
  const { conversionCategories, conversionCategoryName, setConversionCategoryName, animateScroll, editable, setDownloadLink, setEditable, allConversions } = useContext(RDFNContext);

  const { user } = useAuth();
  const { selectedConversion } = useParams();

  // Local state for category search

  const navigate = useNavigate();

  const backToConversions = () => {
    navigate(`/conversions`);
  };

  useEffect(() => {
    const fetch_data = async () => {
      if (!selectedConversion) return;
      setConversionCategoryName(selectedConversion);
    };
    if (user) {
      fetch_data().catch(console.error);
    }
  }, [user, navigate]);



  const toTitleCase = (str: string) =>
    str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

  // Filter and sort the categories




  return (
    <div id="community_dictionaries" className="checkedbyreadefine row">
      <Helmet>
        <title>Conversions</title>
      </Helmet>

      <ConversionCategoriesList />
      <div id="cd_view_container" className="dictselected">
        <div className="main" id="cd_dictionary_container">
          <div id="readefine_cd" className="dictionary_container">
            <Group>
              <BackToDictionaries back={backToConversions} label="Back to Conversions" />
              <Title m="auto" fw="unset" mb="10px" order={1}>
                {toTitleCase(conversionCategoryName || "")}
              </Title>
            </Group>
            <ConversionsList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conversions;
