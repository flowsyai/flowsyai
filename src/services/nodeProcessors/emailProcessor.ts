import { NodeProcessor, NodeExecutionResult, ExecutionContext } from '@/types/execution';
import { logger } from '@/lib/logger';

export class EmailProcessor implements NodeProcessor {
  canProcess(nodeType: string): boolean {
    return ['email', 'notification', 'send-email'].includes(nodeType);
  }

  getRequiredInputs(node: Record<string, unknown>): string[] {
    return ['to', 'subject', 'body'];
  }

  validateInputs(node: Record<string, unknown>, inputs: Record<string, unknown>): boolean {
    const required = this.getRequiredInputs(node);

    for (const input of required) {
      if (!(input in inputs) || inputs[input] === undefined || inputs[input] === '') {
        logger.warn('Missing required input for email node', {
          nodeId: node.id,
          missingInput: input,
        });
        return false;
      }
    }

    // Validate email format
    if (inputs.to && !this.isValidEmail(inputs.to)) {
      logger.warn('Invalid email format', { nodeId: node.id, email: inputs.to });
      return false;
    }

    return true;
  }

  async processNode(
    node: Record<string, unknown>,
    inputs: Record<string, unknown>,
    context: ExecutionContext
  ): Promise<NodeExecutionResult> {
    const startTime = new Date();

    logger.info('Processing email node', {
      nodeId: node.id,
      to: inputs.to,
      subject: inputs.subject,
      executionId: context.executionId,
    });

    try {
      if (!this.validateInputs(node, inputs)) {
        throw new Error('Invalid inputs for email node');
      }

      // Prepare email data
      const emailData = this.prepareEmailData(node, inputs);

      // Send email (mock implementation for now)
      const result = await this.sendEmail(emailData);

      const outputs = {
        emailSent: result.success,
        messageId: result.messageId,
        to: emailData.to,
        subject: emailData.subject,
        sentAt: new Date().toISOString(),
        provider: result.provider || 'mock',
        ...inputs,
      };

      if (!result.success) {
        throw new Error(result.error || 'Failed to send email');
      }

      const processingTime = Date.now() - startTime.getTime();

      logger.info('Email node completed', {
        nodeId: node.id,
        messageId: result.messageId,
        processingTime,
      });

      return {
        nodeId: node.id,
        nodeType: node.type,
        status: 'completed',
        inputs,
        outputs,
        processingTime,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      logger.error('Email node failed', {
        nodeId: node.id,
        error: errorMessage,
        executionId: context.executionId,
      });

      return {
        nodeId: node.id,
        nodeType: node.type,
        status: 'failed',
        inputs,
        outputs: {
          emailSent: false,
          error: errorMessage,
          ...inputs,
        },
        error: errorMessage,
        processingTime: Date.now() - startTime.getTime(),
      };
    }
  }

  private prepareEmailData(
    node: Record<string, unknown>,
    inputs: Record<string, unknown>
  ): Record<string, unknown> {
    const nodeData = node.data || {};

    return {
      to: inputs.to,
      from: inputs.from || nodeData.from || 'noreply@example.com',
      subject: inputs.subject,
      body: inputs.body,
      html: inputs.html || this.convertToHtml(inputs.body),
      cc: inputs.cc || nodeData.cc,
      bcc: inputs.bcc || nodeData.bcc,
      attachments: inputs.attachments || nodeData.attachments,
      priority: inputs.priority || nodeData.priority || 'normal',
      template: nodeData.template,
      templateData: inputs.templateData || {},
    };
  }

  private async sendEmail(emailData: Record<string, unknown>): Promise<Record<string, unknown>> {
    // Mock email sending for now
    // In production, this would integrate with actual email services

    logger.info('Sending email (mock)', {
      to: emailData.to,
      subject: emailData.subject,
      from: emailData.from,
    });

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock success response
    return {
      success: true,
      messageId: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      provider: 'mock',
      sentAt: new Date().toISOString(),
    };
  }

  private convertToHtml(text: string): string {
    if (!text) return '';

    // Simple text to HTML conversion
    return text
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>');
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
