import { ActionIcon, Menu, rem } from "@mantine/core";
import { IconDots, IconTrash } from "@tabler/icons-react";
import classes from "./AITargetCard.module.css";
import { useContext } from "react";
import { RDFNContext } from "../../../RDFNContext";

function AITargetCard({
    className,
    targetName,
    setIsConfirmOpen,
    setCardToRemove
}: any) {
    // @ts-expect-error TS(2339): Property 'proStatus' does not exist on type ... Remove this comment to see the full error message
    const { proStatus } = useContext(RDFNContext);
    return (
        <div className={`aistylecard aitargetcard ${className}`}>
            <div className="aistylecard-content">
                <p>{targetName}</p>
            </div>

            <div className="neweditcontainer">
                {
                    proStatus &&
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <ActionIcon classNames={{
                                root: classes.actionIconRoot,
                                icon: classes.actionIconIcon
                            }} >
                                <IconDots size={16} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                color="red"
                                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                onClick={() => {
                                    setIsConfirmOpen(true);
                                    setCardToRemove(targetName);
                                }}
                            >
                                Delete
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                }
            </div>
        </div>
    );
}

export default AITargetCard