"use client";

import { ImageIcon } from "lucide-react";

import { useToolbarContext } from "@/components/editor/context/toolbar-context";
import { SelectItem } from "../../../../../../components/Select" 

import { InsertImageDialog } from "@/components/editor/plugins/images-plugin";

export function InsertImage() {
  const { activeEditor, showModal } = useToolbarContext();

  return (
    <SelectItem
      value="image"
      onPointerUp={() => {
        showModal("Insert Image", (onClose) => (
          <InsertImageDialog activeEditor={activeEditor} onClose={onClose} />
        ));
      }}

    >
      <div className="flex flex-nowrap items-center gap-1">
        <ImageIcon className="size-4" />
        <span>Image</span>
      </div>
    </SelectItem>
  );
}
