'use client'

import { ChevronRightIcon } from 'lucide-react'

import { useToolbarContext } from '@/components/editor/context/toolbar-context'
import { SelectItem } from "../../../../../../components/Select" 

import { INSERT_COLLAPSIBLE_COMMAND } from '@/components/editor/plugins/collapsible-plugin'

export function InsertCollapsibleContainer() {
  const { activeEditor } = useToolbarContext()
  return (
    <SelectItem
      value="collapsible"
      onPointerUp={() =>
        activeEditor.dispatchCommand(INSERT_COLLAPSIBLE_COMMAND, undefined)
      }

    >
      <div className="flex flex-nowrap items-center gap-1">
        <ChevronRightIcon className="size-4" />
        <span>Collapsible container</span>
      </div>
    </SelectItem>
  )
}
