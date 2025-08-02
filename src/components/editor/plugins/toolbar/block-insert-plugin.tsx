'use client'

import { PlusIcon } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
} from '../../../../../components/Select'

import { useEditorModal } from '@/components/editor/editor-hooks/use-modal'

export function BlockInsertPlugin({ children }: { children: React.ReactNode }) {
  const [modal] = useEditorModal()

  return (
    <>
      {modal}
      <Select value={''}>
        <SelectTrigger className="h-8 [&_span]:w-fit [&_span]:text-content-presentation-action-light-primary w-fit justify-start gap-1 [&_p]:flex [&_p]:items-center [&_p]:gap-2 [&_p]:h-full [&_p]:m-0 [&_p]:w-fit">
          <PlusIcon className="size-4 mt-0.5" />
          <span className='flex h-full text-center shrink-0 items-center w-full'>Insert</span>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>{children}</SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}
