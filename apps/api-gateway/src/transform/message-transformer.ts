import type { ChatMessage } from "@repo/types";

/**
 * MessageTransformer handles context window management for LLM requests.
 * It is inspired by OpenRouter's context compression plugin.
 */
export class MessageTransformer {
  /**
   * Rough token estimation (1 token ≈ 4 characters).
   * This is a simple heuristic used when a real tokenizer is not available.
   */
  private estimateTokens(messages: ChatMessage[]): number {
    return messages.reduce(
      (acc, msg) => acc + Math.ceil(msg.content.length / 4),
      0,
    );
  }

  /**
   * Transforms the message list to fit within the model's maximum context window.
   * "Middle part removal" ensures we keep the most critical context:
   * 1. The original instructions (System prompts / first messages).
   * 2. The most recent context (Last messages).
   *
   * @param messages The original chat history.
   * @param maxTokens The context window limit.
   * @returns Transformed message array.
   */
  transform(messages: ChatMessage[], maxTokens: number): ChatMessage[] {
    if (messages.length <= 2) return messages;

    let currentTokens = this.estimateTokens(messages);
    if (currentTokens <= maxTokens) return messages;

    console.log(
      `[MessageTransformer] Prompt (${currentTokens} tokens) exceeds context limit (${maxTokens}). Compressing...`,
    );

    const result = [...messages];

    // We aim to remove the middle part, but keep the first message (likely system/instructions)
    // and the last few messages (the immediate conversation context).

    // We'll iteratively remove messages from the middle until we are under the limit.
    // The "middle" starts after the first message and ends before the last message.
    while (result.length > 2 && currentTokens > maxTokens) {
      // Find the "middle" element index.
      // Avoiding index 0 (first) and index length-1 (last).
      const middleIndex = Math.floor(result.length / 2);

      // Remove the middle message.
      const removed = result.splice(middleIndex, 1)[0];
      if (removed) {
        const tokensRemoved = Math.ceil(removed.content.length / 4);
        console.log(
          `[MessageTransformer] Removing message at index ${middleIndex}: Role='${removed.role}', ContentLength=${removed.content.length}, EstTokens=${tokensRemoved}`,
        );
        currentTokens -= tokensRemoved;
      }
    }

    console.log(
      `[MessageTransformer] Compression complete. Final messages: ${result.length}, Total estimated tokens: ${currentTokens}`,
    );
    return result;
  }
}

export const messageTransformer = new MessageTransformer();
