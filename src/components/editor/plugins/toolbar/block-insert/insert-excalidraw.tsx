'use client'

import { FrameIcon } from 'lucide-react'

import { useToolbarContext } from '@/components/editor/context/toolbar-context'
import { SelectItem } from "../../../../../../components/Select" 

import { INSERT_EXCALIDRAW_COMMAND } from '@/components/editor/plugins/excalidraw-plugin'

export function InsertExcalidraw() {
  const { activeEditor } = useToolbarContext()
  return (
    <SelectItem
      value="excalidraw"
      onPointerUp={() =>
        activeEditor.dispatchCommand(INSERT_EXCALIDRAW_COMMAND, undefined)
      }

    >
      <div className="flex flex-nowrap items-center gap-1">
        <FrameIcon className="size-4" />
        <span>Excalidraw</span>
      </div>
    </SelectItem>
  )
}
