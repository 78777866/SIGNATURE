import { productionTemplates } from '@/utils/productionTemplates';

export function getTemplateHtml(templateId: string): string {
  const template = productionTemplates.find(t => t.id === templateId);
  return template ? template.html : '';
}

export function getAllTemplates() {
  return productionTemplates;
}
