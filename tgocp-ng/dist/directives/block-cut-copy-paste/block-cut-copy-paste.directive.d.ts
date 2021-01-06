export declare class BlockCutCopyPasteDirective {
    isBlockCutCopyPaste: boolean;
    constructor();
    blockPaste(e: KeyboardEvent): void;
    blockCopy(e: KeyboardEvent): void;
    blockCut(e: KeyboardEvent): void;
    private doBlockEvent;
}
