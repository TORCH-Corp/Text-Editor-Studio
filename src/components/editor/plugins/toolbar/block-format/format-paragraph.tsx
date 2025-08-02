import { $setBlocksType } from '@lexical/selection'
import { $createParagraphNode, $getSelection, $isRangeSelection } from 'lexical'

import { useToolbarContext } from '@/components/editor/context/toolbar-context'
import { SelectItem } from '../../../../../../components/Select'

import { blockTypeToBlockName } from '@/components/editor/plugins/toolbar/block-format/block-format-data'

const BLOCK_FORMAT_VALUE = 'paragraph'

export function FormatParagraph() {
  const { activeEditor } = useToolbarContext()

  const formatParagraph = () => {
    activeEditor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode())
      }
    })
  }

  return (
    <SelectItem value={BLOCK_FORMAT_VALUE} onPointerDown={formatParagraph} className="hover:!text-content-presentation-action-light-primary">
      <div className="flex items-center gap-1 font-normal text-content-presentation-action-light-primary hover:text-content-presentation-action-light-primary">
        {blockTypeToBlockName[BLOCK_FORMAT_VALUE].icon}
        {blockTypeToBlockName[BLOCK_FORMAT_VALUE].label}
      </div>
    </SelectItem>
  )
}
