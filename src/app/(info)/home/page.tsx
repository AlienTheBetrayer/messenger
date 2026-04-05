"use client";
import { Button } from "@/src/shared/ui/button/Button";
import { Checkbox } from "@/src/shared/ui/checkbox/Checkbox";
import { Input } from "@/src/shared/ui/input/Input";
import { MessageBox } from "@/src/shared/ui/messagebox/MessageBox";
import { Modal } from "@/src/shared/ui/popovers/modal/Modal";
import { Tooltip } from "@/src/shared/ui/popovers/tooltip/Tooltip";
import { Select } from "@/src/shared/ui/select/Select";

export default function HomePage() {
    return (
        <>
            <Modal
                element={(hide) => (
                    <div className="container p-8!">
                        <Button>Redirect</Button>
                    </div>
                )}
            >
                <Button>hi</Button>
            </Modal>

            <Tooltip text="Hello">
                <Button>Redirect to abig button</Button>
            </Tooltip>

            <div className="flex flex-col w-64">
                <Input />
                <Checkbox className="ml-auto! w-fit!" />
                <Select items={["a", "b", "Helo owrld", "Big"]} />
                <MessageBox
                    text="This is important!"
                    onSelect={(res) => {
                        if (res === "yes") {
                            return 4;
                        }
                    }}
                >
                    <Button>hi</Button>
                </MessageBox>
            </div>
        </>
    );
}
