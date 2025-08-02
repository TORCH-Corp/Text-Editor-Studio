import { $isListNode, ListNode } from '@lexical/list'
import { $isHeadingNode } from '@lexical/rich-text'
import { $findMatchingParent, $getNearestNodeOfType } from '@lexical/utils'
import { $isRangeSelection, $isRootOrShadowRoot, BaseSelection } from 'lexical'

import { useToolbarContext } from '@/components/editor/context/toolbar-context'
import { useUpdateToolbarHandler } from '@/components/editor/editor-hooks/use-update-toolbar'

import { blockTypeToBlockName } from '@/components/editor/plugins/toolbar/block-format/block-format-data'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
} from '../../../../../components/Select'

export function BlockFormatDropDown({
  children,
}: {
  children: React.ReactNode
}) {
  const { activeEditor, blockType, setBlockType } = useToolbarContext()

  function $updateToolbar(selection: BaseSelection) {
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode()
      let element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
            const parent = e.getParent()
            return parent !== null && $isRootOrShadowRoot(parent)
          })

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow()
      }

      const elementKey = element.getKey()
      const elementDOM = activeEditor.getElementByKey(elementKey)

      if (elementDOM !== null) {
        // setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          )
          const type = parentList
            ? parentList.getListType()
            : element.getListType()
          setBlockType(type)
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType()
          if (type in blockTypeToBlockName) {
            setBlockType(type as keyof typeof blockTypeToBlockName)
          }
        }
      }
    }
  }

  useUpdateToolbarHandler($updateToolbar)

  return (
    <Select
    
      value={blockType}
      onValueChange={(value) => {
        setBlockType(value as keyof typeof blockTypeToBlockName)
      }}
    >
      <SelectTrigger className="h-8 [&_span]:w-fit [&_span]:text-content-presentation-action-light-primary w-fit justify-start gap-1 [&_p]:flex [&_p]:items-center [&_p]:gap-2 [&_p]:h-full [&_p]:m-0 [&_p]:w-fit">
        <div className="flex items-center gap-1 font-normal text-content-presentation-action-light-primary">
          {blockTypeToBlockName[blockType].icon}
          {blockTypeToBlockName[blockType].label}
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>{children}</SelectGroup>
      </SelectContent>
    </Select>
  )
}
