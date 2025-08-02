import { $createCodeNode } from '@lexical/code'
import { $setBlocksType } from '@lexical/selection'
import { $getSelection, $isRangeSelection } from 'lexical'

import { useToolbarContext } from '@/components/editor/context/toolbar-context'
import { SelectItem } from '../../../../../../components/Select'

import { blockTypeToBlockName } from '@/components/editor/plugins/toolbar/block-format/block-format-data'

const BLOCK_FORMAT_VALUE = 'code'

export function FormatCodeBlock() {
  const { activeEditor, blockType } = useToolbarContext()

  const formatCode = () => {
    if (blockType !== 'code') {
      activeEditor.update(() => {
        let selection = $getSelection()

        if (selection !== null) {
          if (selection.isCollapsed()) {
            $setBlocksType(selection, () => $createCodeNode())
          } else {
            const textContent = selection.getTextContent()
            const codeNode = $createCodeNode()
            selection.insertNodes([codeNode])
            selection = $getSelection()
            if ($isRangeSelection(selection)) {
              selection.insertRawText(textContent)
            }
          }
        }
      })
    }
  }

  return (
    <SelectItem value="code" onPointerDown={formatCode} className="hover:!text-content-presentation-action-light-primary">
      <div className="flex items-center gap-1 font-normal text-content-presentation-action-light-primary hover:text-content-presentation-action-light-primary">
        {blockTypeToBlockName[BLOCK_FORMAT_VALUE].icon}
        {blockTypeToBlockName[BLOCK_FORMAT_VALUE].label}
      </div>
    </SelectItem>
  )
}
