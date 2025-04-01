import { Button, Tooltip } from '@repo/ui';
import { IconPaperclip } from '@tabler/icons-react';
import { FC } from 'react';

export type TImageUpload = {
    id: string;
    label: string;
    tooltip: string;
    showIcon: boolean;
    handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ImageUpload: FC<TImageUpload> = ({
    id,
    label,
    tooltip,
    showIcon,
    handleImageUpload,
}) => {
    const handleFileSelect = () => {
        document.getElementById(id)?.click();
    };

    return (
        <>
            <input type="file" id={id} className="hidden" onChange={handleImageUpload} />
            <Tooltip content={tooltip}>
                {showIcon ? (
                    <Button variant="ghost" size="icon-sm" onClick={handleFileSelect}>
                        <IconPaperclip size={16} strokeWidth={2} />
                    </Button>
                ) : (
                    <Button variant="bordered" onClick={handleFileSelect}>
                        {label}
                    </Button>
                )}
            </Tooltip>
        </>
    );
};
