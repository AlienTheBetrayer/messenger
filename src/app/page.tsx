"use client";
import { Button } from "@/src/shared/ui/button/Button";
import { Modal } from "@/src/shared/ui/popovers/modal/Modal";
import { Tooltip } from "@/src/shared/ui/popovers/tooltip/Tooltip";

export default function Home() {
    return (
        <>
            <Modal
                element={(hide) => (
                    <div className="container">
                        <Button>Redirect</Button>
                    </div>
                )}
            >
                <Button>hi</Button>
            </Modal>

            <Tooltip text="Hello">
                <Button>Redirect to abig button</Button>
            </Tooltip>
        </>
    );
}
