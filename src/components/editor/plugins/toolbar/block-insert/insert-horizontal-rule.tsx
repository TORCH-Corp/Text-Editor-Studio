import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode'
import { ScissorsIcon } from 'lucide-react'

import { useToolbarContext } from '@/components/editor/context/toolbar-context'
import { SelectItem } from '@/components/ui/select'

export function InsertHorizontalRule() {
  const { activeEditor } = useToolbarContext()

  return (
    <SelectItem
      value="horizontal-rule"
      onPointerUp={() =>
        activeEditor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)
      }

    >
      <div className="flex items-center gap-1 text-content-presentation-action-light-primary">
        <ScissorsIcon className="size-4" />
        <span>Horizontal Rule</span>
      </div>
    </SelectItem>
  )
}
