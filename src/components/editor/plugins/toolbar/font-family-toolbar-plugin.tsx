'use client'

import { useCallback, useState } from 'react'

import {
  $getSelectionStyleValueForProperty,
  $patchStyleText,
} from '@lexical/selection'
import { $getSelection, $isRangeSelection, BaseSelection } from 'lexical'
import { TypeIcon } from 'lucide-react'

  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
  } from '../../../../../components/Select'

import { useToolbarContext } from '@/components/editor/context/toolbar-context'
import { useUpdateToolbarHandler } from '@/components/editor/editor-hooks/use-update-toolbar'

const FONT_FAMILY_OPTIONS = [
  'Arial',
  'Verdana',
  'Times New Roman',
  'Georgia',
  'Courier New',
  'Trebuchet MS',
]

export function FontFamilyToolbarPlugin() {
  const style = 'font-family'
  const [fontFamily, setFontFamily] = useState('Arial')

  const { activeEditor } = useToolbarContext()

  const $updateToolbar = (selection: BaseSelection) => {
    if ($isRangeSelection(selection)) {
      setFontFamily(
        $getSelectionStyleValueForProperty(selection, 'font-family', 'Arial')
      )
    }
  }

  useUpdateToolbarHandler($updateToolbar)

  const handleClick = useCallback(
    (option: string) => {
      activeEditor.update(() => {
        const selection = $getSelection()
        if (selection !== null) {
          $patchStyleText(selection, {
            [style]: option,
          })
        }
      })
    },
    [activeEditor, style]
  )

  const buttonAriaLabel = 'Formatting options for font family'

  return (
    <Select
      value={fontFamily}
      onValueChange={(value) => {
        setFontFamily(value)
        handleClick(value)
      }}
      aria-label={buttonAriaLabel}
    >
      <SelectTrigger className="h-8 [&_span]:w-fit w-fit justify-start gap-1 [&_p]:flex [&_p]:items-center [&_p]:gap-2 [&_p]:h-full [&_p]:m-0 [&_p]:w-fit">
        <TypeIcon className="size-4" />
        <span className='flex  h-full text-center shrink-0 items-center w-full'>{fontFamily}</span>
      </SelectTrigger>
      <SelectContent>
        {FONT_FAMILY_OPTIONS.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
