import "./MessageBox.css";
import { Modal } from "@/src/shared/ui/popovers/modal/Modal";
import { MessageBoxDialog } from "@/src/shared/ui/messagebox/MessageBoxDialog";

type Props = {
    children: React.ReactNode;
    text: string;
    onSelect: (response: "yes" | "no") => void;
};

export const MessageBox = ({ children, text, onSelect }: Props) => {
    return (
        <Modal
            className="w-full *:w-full"
            direction="screen-middle"
            tooltipStyle={{ width: "100vw", maxWidth: "22rem" }}
            element={(hide) => (
                <MessageBoxDialog
                    onSelect={(res) => {
                        hide();
                        onSelect(res);
                    }}
                >
                    {text}
                </MessageBoxDialog>
            )}
        >
            {children}
        </Modal>
    );
};
