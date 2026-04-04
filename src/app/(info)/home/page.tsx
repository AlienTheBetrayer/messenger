"use client";
import { Button } from "@/src/shared/ui/button/Button";
import { Checkbox } from "@/src/shared/ui/checkbox/Checkbox";
import { Input } from "@/src/shared/ui/input/Input";
import { Modal } from "@/src/shared/ui/popovers/modal/Modal";
import { Tooltip } from "@/src/shared/ui/popovers/tooltip/Tooltip";

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
                <Checkbox className="ml-auto! w-fit!"/>
            </div>
        </>
    );
}
