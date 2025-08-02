'use client'

import { INSERT_EMBED_COMMAND } from '@lexical/react/LexicalAutoEmbedPlugin'

import { useToolbarContext } from '@/components/editor/context/toolbar-context'
import { SelectItem } from "../../../../../../components/Select" 

import { EmbedConfigs } from '@/components/editor/plugins/embeds/auto-embed-plugin'

export function InsertEmbeds() {
  const { activeEditor } = useToolbarContext()
  return EmbedConfigs.map((embedConfig) => (
    <SelectItem
      key={embedConfig.type}
      value={embedConfig.type}
      onPointerUp={() => {
        activeEditor.dispatchCommand(INSERT_EMBED_COMMAND, embedConfig.type)
      }}

    >
      <div className="flex flex-nowrap items-center gap-1">
        {embedConfig.icon}
        <span>{embedConfig.contentName}</span>
      </div>
    </SelectItem>
  ))
}
