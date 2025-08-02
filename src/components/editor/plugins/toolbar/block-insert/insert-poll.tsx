import { ListChecksIcon } from 'lucide-react'

import { useToolbarContext } from '@/components/editor/context/toolbar-context'
import { SelectItem } from "../../../../../../components/Select" 

import { InsertPollDialog } from '@/components/editor/plugins/poll-plugin'

export function InsertPoll() {
  const { activeEditor, showModal } = useToolbarContext()

  return (
    <SelectItem
      value="poll"
      onPointerUp={() =>
        showModal('Insert Poll', (onClose) => (
          <InsertPollDialog activeEditor={activeEditor} onClose={onClose} />
        ))
      }

    >
      <div className="flex flex-nowrap items-center gap-1">
        <ListChecksIcon className="size-4" />
        <span>Poll</span>
      </div>
    </SelectItem>
  )
}
