import { useContext, useEffect, useState } from "react";
import { Accordion, Group, List, LoadingOverlay, Switch, Text } from "@mantine/core";
import { RDFNContext } from "../../../RDFNContext";
import { useAuth } from "../../../contexts/AuthContext";
import { compile } from 'mathjs';
import { openConfirmModal } from "@mantine/modals";

export type ConversionType = "formula" | "dynamic";

export interface Conversion {
    sourceName: string;
    targetName: string;
    sourceAliases: string[];
    type: ConversionType;
    formula?: string;
    id: string;
}

interface SingleAccordionRowProps {
    even: boolean;
    conversion: Conversion;
}

export function SingleAccordionRow({
    even,
    conversion,
}: SingleAccordionRowProps) {
    // @ts-ignore
    const { enabledConversions, conversionCategoryName, updateUserProfileData } = useContext(RDFNContext); 
    const { makeRdfnRequest } = useAuth();
    const [opened, setOpened] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const { sourceName, targetName, sourceAliases, formula, type, id } = conversion;

    let factorDisplay = "";
    if (type === "formula" && formula && formula.includes("value")) {
        try {
            const expr = compile(formula);
            const offset = expr.evaluate({ value: 0 });
            const oneValue = expr.evaluate({ value: 1 });
            const factor = oneValue - offset;
            const roundedFactor = factor.toFixed(2);
            factorDisplay = `1 ${sourceName} = ${roundedFactor} ${targetName}`;
        } catch (error) {
            factorDisplay = formula;
        }
    } else if (type === "dynamic") {
        factorDisplay = "Dynamic factor (fetched/calculated at runtime)";
    }    
    useEffect(() => {
        setEnabled(Boolean(enabledConversions?.[conversionCategoryName]?.[id]));
    }, [enabledConversions, conversionCategoryName, id]);    
    const enableConversionOnServer = async () => {
        const raw = { [conversionCategoryName]: id };
        const path = "/user/conversions";
        const updatedUserProfileRaw = await makeRdfnRequest(path, "POST", {}, raw);
        const updatedUserProfile = await updatedUserProfileRaw.json();
        await updateUserProfileData(updatedUserProfile);
    };

    function flattenEnabledConversions(
        enabledConversions: any
    ): any[] {
        return Object.values(enabledConversions).flatMap((categoryObj: any) =>
            Object.values(categoryObj)
        );
    }
    function getConflicts(
        newConversion: Conversion,
        allEnabledConversions: Conversion[]
    ): Conversion[] {
        const { sourceName: X, targetName: Y } = newConversion;

        return allEnabledConversions.filter((conv) => {
            const isYtoSomething = conv.sourceName === Y; 
            const isSomethingToX = conv.targetName === X; 
            const isCompetingX = conv.sourceName === X && conv.targetName !== Y; 
            return isYtoSomething || isSomethingToX || isCompetingX;
        });
    }

    const onToggle = async (val: boolean) => {
        setLoading(true);         
        if (val) {
            const enabledConversionsArray = flattenEnabledConversions(enabledConversions);            const conflicts = getConflicts(conversion, enabledConversionsArray);
            console.log("Conflicts: ", conflicts);
            if (conflicts.length > 0) {
                openConfirmModal({
                    title: "Conflicting conversions",
                    centered: true,
                    children: (
                        <>
                            <Text>
                                Enabling <strong>{`${sourceName} → ${targetName}`}</strong> will disable the following conversions:
                            </Text>
                            <List>
                                {conflicts.map((c: any) => (
                                    <List.Item key={c.id}>{`${c.sourceName} → ${c.targetName}`}</List.Item>
                                ))}
                            </List>
                        </>
                    ),
                    labels: { confirm: "Got it", cancel: "Cancel" },
                    confirmProps: { color: "rdfnyellow.6", autoContrast: true },
                    onCancel: () => {
                        setEnabled(false); 
                        setLoading(false);
                    },
                    onConfirm: async () => {
                        try {
                            await enableConversionOnServer();
                        } catch (err) {
                            console.error(err);
                        }
                        setLoading(false);
                    },
                    onClose: () => {
                        setLoading(false);
                    }
                });
                return; 
            } else {
                
                try {
                    await enableConversionOnServer();
                } catch (err) {
                    console.error(err);
                }
                setLoading(false);
            }
        } else {
            
            
            try {
                await enableConversionOnServer();
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        }
    };

    return (
        <div style={{ position: "relative" }}>
            <LoadingOverlay visible={loading} loaderProps={{ color: 'rdfnyellow.6' }} />
            <Accordion
                chevron={false}
                multiple
                variant="separated"
                value={opened ? ["item"] : []}
                onChange={(vals) => {
                    setOpened(vals.includes("item"));
                }}
                styles={{
                    item: {
                        border: "none",
                        backgroundColor: even
                            ? "light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-8))"
                            : "unset",
                    },
                }}
            >
                <Accordion.Item value="item">
                    <Accordion.Control>
                        <Group
                            wrap="nowrap"
                            justify="space-between"
                            align="center"
                            style={{ width: "100%" }}
                        >
                            <div>
                                <Text fw={500}>
                                    {sourceName.replaceAll("_", " ")} → {targetName.replaceAll("_", " ")}
                                </Text>
                                {factorDisplay && (
                                    <Text size="sm" color="dimmed">
                                        {factorDisplay.replaceAll("_", " ")}
                                    </Text>
                                )}
                            </div>
                            <Switch
                                checked={enabled}
                                onChange={(event) => onToggle(event.currentTarget.checked)}
                                styles={{
                                    track: {
                                        border: "none",
                                        backgroundColor: enabled
                                            ? "var(--mantine-color-rdfnyellow-6)"
                                            : "var(--mantine-color-gray-4)",
                                    },
                                }}
                            />
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Text size="sm">
                            <strong>Alternative labels:</strong>{" "}
                            {sourceAliases.join(", ")}
                        </Text>
                        {type === "formula" && formula && (
                            <Text size="sm" mt={2}>
                                <strong>Formula:</strong> {formula}
                            </Text>
                        )}
                        {type === "dynamic" && (
                            <Text size="sm" mt={2}>
                                <strong>Dynamic conversion:</strong> real factor determined at
                                runtime.
                            </Text>
                        )}
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}