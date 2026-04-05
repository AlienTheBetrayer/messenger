import { Button } from "@/src/shared/ui/button/Button";
import { Buttons } from "@/src/shared/ui/imageselect/Buttons";
import { Error } from "@/src/shared/ui/imageselect/Error";
import { Images } from "@/src/shared/ui/imageselect/Images";
import { useImageSelect } from "@/src/shared/ui/imageselect/useImageSelect";

type Props = {
    value: string;
    onChange: (file: File | null) => void;
    onError?: (file: File) => void;
    mbLimit?: number;
    className?: string;
    containerClassName?: string;
};

export const ImageSelect = ({ value, containerClassName, onChange, onError, mbLimit = 1, className }: Props) => {
    const { error, inputRef, selected, setError, setSelected } = useImageSelect();

    return (
        <div className={`relative w-fit h-fit ${containerClassName ?? ""}`}>
            <input
                type="file"
                ref={inputRef}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];

                    if (!file) {
                        return;
                    }

                    if (file.size > (mbLimit ?? 1) * 1024 * 1024) {
                        onError?.(file);
                        setError(true);
                        return;
                    }

                    setSelected(file);
                }}
                accept="image/*"
                className="hidden"
                tabIndex={-1}
            />

            <Button
                className={`p-0! group outline-2 hover:outline-blue-1! duration-400! 
                    not-hover:rounded-[6rem]! hover:rounded-[5rem]! focus-visible:rounded-[5rem]!
                    ${className ?? ""}`}
                onClick={() => {
                    inputRef.current?.click();
                }}
            >
                <Images
                    value={value}
                    selected={selected}
                />

                <Error
                    error={error}
                    mbLimit={mbLimit}
                />
            </Button>

            <Buttons
                inputRef={inputRef}
                onChange={onChange}
                selected={selected}
                setSelected={setSelected}
                value={value}
            />
        </div>
    );
};
