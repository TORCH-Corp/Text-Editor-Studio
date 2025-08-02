'use client'

import { SquareSplitVerticalIcon } from 'lucide-react'

import { useToolbarContext } from '@/components/editor/context/toolbar-context'
import { SelectItem } from "../../../../../../components/Select" 

import { INSERT_PAGE_BREAK } from '@/components/editor/plugins/page-break-plugin'

export function InsertPageBreak() {
  const { activeEditor } = useToolbarContext()

  return (
    <SelectItem
      value="page-break"
      onPointerUp={() =>
        activeEditor.dispatchCommand(INSERT_PAGE_BREAK, undefined)
      }

    >
      <div className="flex flex-nowrap items-center gap-1">
        <SquareSplitVerticalIcon className="size-4" />
        <span>Page Break</span>
      </div>
    </SelectItem>
  )
}
