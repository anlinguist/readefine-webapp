import { Virtuoso } from "react-virtuoso";
import { useState, useContext, useMemo } from "react";
import { Conversion, SingleAccordionRow } from "./ConversionRow";
import { RDFNContext } from "../../../RDFNContext"; // adjust path if needed
import { Group, MultiSelect } from "@mantine/core";
import classes from "./ConversionsList.module.css";

export default function ConversionsList() {
  // State for selected filters from the multi-select component
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // @ts-expect-error TS(2339): Property 'enabledConversions' does not exist on type 'RDFNContextType'
  const { allConversions, enabledConversions, conversionCategoryName } = useContext(RDFNContext);
  const conversions = allConversions[conversionCategoryName] || {};
  let conversionEntries: [string, Conversion][] = Object.entries(conversions);

  // Build options for the MultiSelect – one for each unique value in targetName, sourceName, and sourceAliases
  const multiSelectOptions = useMemo(() => {
    const targetSet = new Set<string>();
    const sourceSet = new Set<string>();
    const aliasSet = new Set<string>();

    Object.entries(conversions).forEach(([_, conversion]: any) => {
      if (conversion.targetName) targetSet.add(conversion.targetName);
      if (conversion.sourceName) sourceSet.add(conversion.sourceName);
      if (Array.isArray(conversion.sourceAliases)) {
        conversion.sourceAliases.forEach((alias: string) => aliasSet.add(alias));
      }
    });

    const targetOptions = Array.from(targetSet).map((value) => ({
      value: `target:${value}`,
      label: value.replaceAll("_", " "),
    }));
    const sourceOptions = Array.from(sourceSet).map((value) => ({
      value: `source:${value}`,
      label: value.replaceAll("_", " "),
    }));
    const aliasOptions = Array.from(aliasSet).map((value) => ({
      value: `alias:${value}`,
      label: value.replaceAll("_", " "),
    }));

    return [
      { group: "Target", items: targetOptions },
      { group: "Source", items: sourceOptions },
      { group: "Alternative Labels", items: aliasOptions },
    ];
  }, [conversions]);

  conversionEntries = conversionEntries.filter(([_, conversion]) => {
    if (selectedFilters.length === 0) return true;
  
    return selectedFilters.every((filter) => {
      // Extract the role and the actual value
      const [role, filterValue] = filter.split(':');
      const normalizedFilterValue = filterValue.trim().toLowerCase();
  
      // Compare based on the role
      switch (role.toLowerCase()) {
        case "target":
          return conversion.targetName?.toLowerCase() === normalizedFilterValue;
        case "source":
          return conversion.sourceName?.toLowerCase() === normalizedFilterValue;
        case "alias":
          return (
            Array.isArray(conversion.sourceAliases) &&
            conversion.sourceAliases.some(
              (alias) => alias.toLowerCase() === normalizedFilterValue
            )
          );
        default:
          return false;
      }
    });
  });
  
  conversionEntries.sort(([keyA], [keyB]) => {
    const isAEnabled = Boolean(enabledConversions?.[conversionCategoryName]?.[keyA]);
    const isBEnabled = Boolean(enabledConversions?.[conversionCategoryName]?.[keyB]);

    if (isAEnabled && !isBEnabled) return -1;
    if (!isAEnabled && isBEnabled) return 1;
    return keyA.localeCompare(keyB);
  });

  return (
    <>
      <Group mb={"10px"}>
        <MultiSelect
          classNames={{
            input: classes.input,
          }}
          w={"100%"}
          data={multiSelectOptions}
          placeholder="Search conversions..."
          searchable
          nothingFoundMessage="No options"
          value={selectedFilters}
          onChange={setSelectedFilters}
          clearable
        />
      </Group>
      <div id="cd_readefinitions_container">
        <Virtuoso
          key={conversionCategoryName}
          data={conversionEntries}
          style={{ height: "100%" }}
          itemContent={(index: number, [key, conversion]: [string, Conversion]) => {
            if (!conversion) return null;
            return (
              <SingleAccordionRow
                key={key}
                even={index % 2 === 0}
                conversion={{ ...conversion, id: key }}
              />
            );
          }}
        />
      </div>
    </>
  );
}