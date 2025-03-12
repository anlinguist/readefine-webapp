import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import SearchInput from '../../Search/SearchInput';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState, useMemo } from 'react';
import { RDFNContext } from '../../../RDFNContext';
import { Button } from '@mantine/core';
import { IconHelpCircle } from '@tabler/icons-react';
import { openContextModal } from '@mantine/modals';

function ConversionCategoriesList() {
    // @ts-expect-error TS(2339): Property 'conversionCategories' does not exist on type 'RDFNContextType'
    const { conversionCategories, conversionCategoryName } = useContext(RDFNContext);
    const navigate = useNavigate();
    const [catQ, setCatQ] = useState("");

    // Virtuoso ref to access scrollToIndex
    const virtuosoRef = useRef<VirtuosoHandle>(null);

    const changeconversion = (_: any, val: any) => {
        navigate(`/conversions/${val}`);
    };

    // Memoize sorted and filtered categories
    const sortedFilteredCategories = useMemo(() => {
        return conversionCategories
            ? conversionCategories
                .filter((cat: string) => cat.toLowerCase().includes(catQ.toLowerCase()))
                .sort((a: string, b: string) => a.localeCompare(b))
            : [];
    }, [conversionCategories, catQ]);

    // Memoize categoriesData
    const categoriesData = useMemo(() => {
        return [
            ["__search_bar__", null],
            ...sortedFilteredCategories.map((cat: string) => [cat, cat]),
        ];
    }, [sortedFilteredCategories]);

    // When conversionCategoryName changes, scroll to its index in the list.
    useEffect(() => {
        if (conversionCategoryName && virtuosoRef.current) {
            // Since our first item is the search bar, the index of the category is offset by 1.
            const index = categoriesData.findIndex(([_, item]) => item === conversionCategoryName);
            if (index > -1) {
                virtuosoRef.current.scrollToIndex({
                    index,
                    align: 'start', // or 'smart' if preferred
                    behavior: 'smooth'
                });
            }
        }
    }, [conversionCategoryName, categoriesData]);

    const toTitleCase = (str: string) =>
        str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });

            const requestConversion = () => {
              openContextModal({
                modal: "request-conversion",
                title: "Request a conversion",
                size: "sm",
                centered: true,
                innerProps: {},
              });
            }

    return (<div id="cds_list_container" className={`${conversionCategoryName ? "dictselected" : "dictnotselected"}`} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Button styles={{
            root: {
                padding: '5px',
                boxSizing: 'content-box'
            },
            label: {
                fontSize: 'var(--mantine-font-size-md)'
            }
        }} onClick={requestConversion} mt={0} mb={10} autoContrast color="rdfnyellow.6" leftSection={<IconHelpCircle size={20} />} variant="filled" radius="md">
            Request a conversion
        </Button>
        <div id="cds_list" style={{ position: "relative" }}>
            <Virtuoso
                ref={virtuosoRef}
                topItemCount={1}
                data={categoriesData}
                style={{ height: "100%", width: "100%" }}
                itemContent={(index, [key, item]) => {
                    if (key === "__search_bar__") {
                        return (
                            <SearchInput
                                q={catQ}
                                setQ={setCatQ}
                                placeholder="Search Categories"
                                noBorder={true}
                            />
                        );
                    }
                    return (
                        <div
                            key={index}
                            onClick={() => changeconversion(null, item)}
                            className={
                                "user_enabled_cd cds " +
                                (conversionCategoryName === item ? "selected" : "")
                            }
                        >
                            <div className="cds_title">{toTitleCase(item)}</div>
                        </div>
                    );
                }}
            />
        </div>
    </div>
    );
}

export default ConversionCategoriesList;
