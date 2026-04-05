"use client";
import { Button } from "@/src/shared/ui/button/Button";
import { Checkbox } from "@/src/shared/ui/checkbox/Checkbox";
import { ImageSelect } from "@/src/shared/ui/imageselect/ImageSelect";
import { Input } from "@/src/shared/ui/input/Input";
import { MessageBox } from "@/src/shared/ui/messagebox/MessageBox";
import { Modal } from "@/src/shared/ui/popovers/modal/Modal";
import { Tooltip } from "@/src/shared/ui/popovers/tooltip/Tooltip";
import { Select } from "@/src/shared/ui/select/Select";
import { useState } from "react";

export default function HomePage() {
    const [img, setImg] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);

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

                <ImageSelect
                    className="w-32 aspect-square"
                    value={img}
                    onChange={(file) => {
                        setImg(!file ? "" : URL.createObjectURL(file));
                    }}
                />
            </div>
        </>
    );
}
