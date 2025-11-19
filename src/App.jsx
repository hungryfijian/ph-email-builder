import React, { useState } from 'react';
import { Copy, Eye, Code, Plus, Trash2, ChevronDown, ChevronUp, Sparkles, Loader } from 'lucide-react';

export default function EmailBuilder() {
  const [subject, setSubject] = useState('');
  const [headerTitle, setHeaderTitle] = useState('');
  const [greeting, setGreeting] = useState('Dear Customer,');
  const [contentBlocks, setContentBlocks] = useState([]);
  const [closingMessage, setClosingMessage] = useState('');
  const [signatureName, setSignatureName] = useState('Zoe Blake');
  const [psMessage, setPsMessage] = useState('');
  const [view, setView] = useState('builder');
  const [copied, setCopied] = useState(false);
  const [expandedBlock, setExpandedBlock] = useState(null);
  
  // AI fields
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState('');

  const blockTypes = [
    { value: 'paragraph', label: 'Paragraph' },
    { value: 'heading2', label: 'Main Heading (H2)' },
    { value: 'heading3', label: 'Sub Heading (H3)' },
    { value: 'highlight', label: 'Highlight Box' },
    { value: 'cta', label: 'CTA Box (Purple)' },
    { value: 'button', label: 'Single Button' },
    { value: 'dualButton', label: 'Dual Buttons' },
    { value: 'bulletList', label: 'Bullet List' },
    { value: 'image', label: 'Image' },
  ];

  const generateWithAI = async () => {
    if (!aiPrompt.trim()) {
      setAiError('Please enter a description of the email you want to create');
      return;
    }

    setIsGenerating(true);
    setAiError('');

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your environment variables.');
      }

      const prompt = `You are an expert email copywriter for Pocket Hearing, the UK's leading online retailer specializing exclusively in Signia hearing aids.

User Request: ${aiPrompt}

Generate a professional email following these exact specifications:

BRAND CONTEXT:

COMPANY OVERVIEW:
- Specialty: Online retailer of Signia hearing aids exclusively
- Founded: 2020 by Iram Darr (Managing Director)
- Location: The Old Gun Factory, 20 Watkinson Street, Liverpool L1 0BE
- Key Audiologist: Zoe Blake (Manager, based in Italy, handles all patient consultations globally)

CORE VALUE PROPOSITIONS:

1. Affordability & Value
   - "Where quality meets affordability"
   - Prices slashed by more than half (50%+) compared to high street retailers (Boots, Specsavers, Amplifon)
   - Premium hearing aids at "pocket-friendly prices"
   - Hearing aids cost hundreds, not thousands

2. Virtual Hearing Care Innovation
   - "The Hearing Centre in Your Pocket"
   - "Hear The Future" - pioneering online hearing care
   - World's first comprehensive "no-touch" hearing care solution
   - Remote programming and fine-tuning via Signia App
   - Free online hearing test using award-winning Ctone audiometry

3. Professional Expertise
   - Real audiologist support (Zoe Blake) via telecare appointments
   - Founded and operated by qualified audiologists
   - Professional programming before dispatch
   - Comprehensive aftercare and follow-up consultations

4. Convenience & Control
   - Complete process from home comfort
   - No shop front visits required
   - Control hearing aids via smartphone app (iOS/Android)
   - Fast delivery (typically 2 days)
   - Appointments scheduled at customer's convenience

5. Quality Without Compromise
   - Exclusive Signia hearing aids (all models from Silk to Styletto)
   - 2-year warranty on all devices
   - Free returns, no questions asked
   - Professional service without budget compromise

PRODUCT RANGE (Signia Only):

Current Generation (IX Platform):
- Signia Silk Charge&Go IX (invisible, rechargeable, CIC)
- Signia Pure Charge&Go IX (RealTime Conversation Enhancement, RITE)
- Signia Active Pro IX

Previous Generation (AX Platform):
- Signia Pure Charge&Go AX (Augmented Xperience)
- Signia Styletto AX (fashion-forward, slim design)

X Platform:
- Signia Silk X (completely-in-canal, invisible)
- Signia Active X (lifestyle-focused)
- Signia Pure X
- Signia Styletto X

Specialized Solutions:
- CROS & BiCROS systems for single-sided deafness
- Silk CROS X and Silk CROS IX (invisible CROS)
- Pure Charge&Go CROS AX
- Styletto CROS AX

SERVICE OFFERINGS:
Included with Purchase:
- Free online hearing test
- Professional programming before dispatch
- Free medical and lifestyle welcome telecare consultation
- Signia App connection and training
- Follow-up fine-tuning telecare appointment
- Ongoing care on pay-as-you-go basis

Additional Services:
- Reprogramming services
- Professional cleaning and servicing
- Repairs (£295 per device, 4-year coverage)
- Extraction cord replacement
- Support for former Hearing Direct customers

MISSION DEEP POCKET (Social Impact):
- 30% of company profits donated to provide hearing aids to those in need globally
- Partnership with Donación Salud Auditiva (Elena Pina Mendez)
- Donated £10,000 in power hearing aids for terminally ill children in Mexico
- Manufacturer supplies donated aids at cost price
- Focus on areas without access to hearing care

KEY DIFFERENTIATORS:
- Single-brand specialization (perfect technology knowledge)
- True audiologist support (not just sales staff)
- Virtual care delivery worldwide
- No waiting times (vs 18-month NHS waits)
- Transparent pricing, significant savings
- Founded by practicing audiologists who understand patient needs

CONTACT INFORMATION:
- Phone: 0800 331 7006
- Email: contact@pockethearing.com (1 business day response)
- Hours: 9 AM onwards
- Website: https://www.pockethearing.com
- Book Consultation: https://app.squarespacescheduling.com/schedule/a923d61b/appointment/20545940/calendar/3969702?appointmentTypeIds[]=20545940

SOCIAL MEDIA:
- Facebook: https://www.facebook.com/pockethearing
- YouTube: https://www.youtube.com/@pockethearing

TONE: Professional, friendly, caring, accessible. UK English spelling. Focus on affordability (50%+ savings), convenience of virtual care, Signia product quality, and Zoe Blake's professional support.

Return ONLY valid JSON in this exact structure (no markdown, no code blocks, just raw JSON):

{
  "subject": "Email subject line",
  "headerTitle": "Main header (can include <br/> for line breaks)",
  "greeting": "Dear Customer," or similar,
  "contentBlocks": [
    {
      "type": "paragraph|heading2|heading3|highlight|cta|button|dualButton|bulletList",
      "content": {
        // For paragraph: { "text": "..." }
        // For heading2/heading3: { "text": "..." }
        // For highlight: { "title": "...", "text": "..." }
        // For cta: { "title": "...", "buttonText": "...", "buttonUrl": "..." }
        // For button: { "text": "...", "url": "...", "color": "cyan|purple" }
        // For dualButton: { "button1Text": "...", "button1Url": "...", "button2Text": "...", "button2Url": "..." }
        // For bulletList: { "items": ["item1", "item2", ...] }
      }
    }
  ],
  "closingMessage": "Closing paragraph before signature",
  "signatureName": "Zoe Blake",
  "psMessage": "Optional P.S. message or empty string"
}

IMPORTANT:
- Use <strong> tags for bold text in paragraphs
- Use <br/> for line breaks where needed
- Include relevant URLs from the list above
- Create 5-10 content blocks typically
- Make it compelling and actionable
- Focus on helping customers hear better and improving quality of life`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8192,
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to generate email');
      }

      const data = await response.json();
      const generatedText = data.candidates[0]?.content?.parts[0]?.text;

      if (!generatedText) {
        throw new Error('No content generated');
      }

      // Clean the response - remove markdown code blocks if present
      let cleanedText = generatedText.trim();
      cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      
      const emailData = JSON.parse(cleanedText);

      // Populate the form with generated data
      setSubject(emailData.subject || '');
      setHeaderTitle(emailData.headerTitle || '');
      setGreeting(emailData.greeting || 'Dear Customer,');
      setClosingMessage(emailData.closingMessage || '');
      setSignatureName(emailData.signatureName || 'Zoe Blake');
      setPsMessage(emailData.psMessage || '');

      // Create content blocks with unique IDs
      const blocks = (emailData.contentBlocks || []).map(block => ({
        id: Date.now() + Math.random(),
        type: block.type,
        content: block.content
      }));

      setContentBlocks(blocks);
      // Keep the prompt text so users can edit and regenerate

    } catch (error) {
      console.error('AI Generation Error:', error);
      setAiError(error.message || 'Failed to generate email. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const addBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type,
      content: {},
    };

    switch (type) {
      case 'paragraph':
        newBlock.content = { text: '' };
        break;
      case 'heading2':
        newBlock.content = { text: '' };
        break;
      case 'heading3':
        newBlock.content = { text: '' };
        break;
      case 'highlight':
        newBlock.content = { title: '', text: '' };
        break;
      case 'cta':
        newBlock.content = { title: '', buttonText: '', buttonUrl: '' };
        break;
      case 'button':
        newBlock.content = { text: '', url: '', color: 'cyan' };
        break;
      case 'dualButton':
        newBlock.content = { 
          button1Text: '', button1Url: '', 
          button2Text: '', button2Url: '' 
        };
        break;
      case 'bulletList':
        newBlock.content = { items: [''] };
        break;
      case 'image':
        newBlock.content = {
          url: '',
          alt: '',
          width: 600,
          align: 'center',
          isLoading: false,
          isLoaded: false,
          error: ''
        };
        break;
    }

    setContentBlocks([...contentBlocks, newBlock]);
    setExpandedBlock(newBlock.id);
  };

  const updateBlock = (id, content) => {
    setContentBlocks(contentBlocks.map(block => 
      block.id === id ? { ...block, content } : block
    ));
  };

  const deleteBlock = (id) => {
    setContentBlocks(contentBlocks.filter(block => block.id !== id));
  };

  const moveBlock = (id, direction) => {
    const index = contentBlocks.findIndex(block => block.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === contentBlocks.length - 1)
    ) return;

    const newBlocks = [...contentBlocks];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
    setContentBlocks(newBlocks);
  };

  const loadImagePreview = (blockId, url) => {
    // Validate URL format
    if (!url || !url.trim()) {
      updateBlock(blockId, {
        ...contentBlocks.find(b => b.id === blockId).content,
        error: 'Please enter a valid image URL',
        isLoading: false,
        isLoaded: false
      });
      return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      updateBlock(blockId, {
        ...contentBlocks.find(b => b.id === blockId).content,
        error: 'URL must start with http:// or https://',
        isLoading: false,
        isLoaded: false
      });
      return;
    }

    // Set loading state
    updateBlock(blockId, {
      ...contentBlocks.find(b => b.id === blockId).content,
      isLoading: true,
      error: '',
      isLoaded: false
    });

    // Try to load the image
    const img = new Image();
    img.onload = () => {
      updateBlock(blockId, {
        ...contentBlocks.find(b => b.id === blockId).content,
        isLoading: false,
        isLoaded: true,
        error: '',
        imageDimensions: { width: img.width, height: img.height }
      });
    };
    img.onerror = () => {
      updateBlock(blockId, {
        ...contentBlocks.find(b => b.id === blockId).content,
        isLoading: false,
        isLoaded: false,
        error: 'Failed to load image. Please check the URL and try again.'
      });
    };
    img.src = url;
  };

  const generateHTML = () => {
    let contentHTML = '';

    contentBlocks.forEach(block => {
      switch (block.type) {
        case 'paragraph':
          contentHTML += `
            <p style="margin: 0 0 15px 0;">${block.content.text}</p>
          `;
          break;
        
        case 'heading2':
          contentHTML += `
            <h2 style="color: #253551; font-family: Arial, Helvetica, sans-serif; font-size: 20px; margin: 30px 0 15px 0; font-weight: bold; line-height: 1.3;">
                ${block.content.text}
            </h2>
          `;
          break;
        
        case 'heading3':
          contentHTML += `
            <h3 style="color: #ED1C24; font-family: Arial, Helvetica, sans-serif; font-size: 16px; margin: 20px 0 10px 0; font-weight: bold; line-height: 1.3;">
                ${block.content.text}
            </h3>
          `;
          break;
        
        case 'highlight':
          contentHTML += `
            <table width="100%" cellpadding="15" cellspacing="0" border="0" style="background-color: #ced6e5; border-left: 4px solid #FF9100; margin: 20px 0;">
                <tr>
                    <td>
                        <p style="color: #ED1C24; font-size: 16px; font-weight: bold; margin: 0 0 10px 0; font-family: Arial, Helvetica, sans-serif;">
                            ${block.content.title}
                        </p>
                        <p style="margin: 0; font-size: 14px; color: #2A2829; font-family: Arial, Helvetica, sans-serif;">
                            ${block.content.text}
                        </p>
                    </td>
                </tr>
            </table>
          `;
          break;
        
        case 'cta':
          contentHTML += `
            <table width="100%" cellpadding="20" cellspacing="0" border="0" style="background-color: #ED1C24; margin: 25px 0;">
                <tr>
                    <td style="text-align: center;">
                        <p style="color: #FFFFFF; margin: 0 0 10px 0; font-size: 16px; font-weight: bold; font-family: Arial, Helvetica, sans-serif;">
                            ${block.content.title}
                        </p>
                        <table cellpadding="0" cellspacing="0" border="0" style="margin: 15px auto;">
                            <tr>
                                <td style="background-color: #FF9100; text-align: center;">
                                    <a href="${block.content.buttonUrl}" style="display: block; padding: 12px 30px; color: #FFFFFF; text-decoration: none; font-weight: bold; font-size: 16px; font-family: Arial, Helvetica, sans-serif;">
                                        ${block.content.buttonText}
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
          `;
          break;
        
        case 'button':
          const buttonColor = block.content.color === 'purple' ? '#ED1C24' : '#FF9100';
          contentHTML += `
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 15px auto;">
                <tr>
                    <td style="background-color: ${buttonColor}; text-align: center;">
                        <a href="${block.content.url}" style="display: block; padding: 12px 30px; color: #FFFFFF; text-decoration: none; font-weight: bold; font-size: 16px; font-family: Arial, Helvetica, sans-serif;">
                            ${block.content.text}
                        </a>
                    </td>
                </tr>
            </table>
          `;
          break;
        
        case 'dualButton':
          contentHTML += `
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 30px auto;">
                <tr>
                    <td style="padding: 0 10px 0 0;">
                        <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td style="background-color: #ED1C24; text-align: center;">
                                    <a href="${block.content.button1Url}" style="display: block; padding: 12px 30px; color: #FFFFFF; text-decoration: none; font-weight: bold; font-size: 16px; font-family: Arial, Helvetica, sans-serif;">
                                        ${block.content.button1Text}
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="padding: 0 0 0 10px;">
                        <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td style="background-color: #FF9100; text-align: center;">
                                    <a href="${block.content.button2Url}" style="display: block; padding: 12px 30px; color: #FFFFFF; text-decoration: none; font-weight: bold; font-size: 16px; font-family: Arial, Helvetica, sans-serif;">
                                        ${block.content.button2Text}
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
          `;
          break;
        
        case 'bulletList':
          contentHTML += `
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 15px 0;">
          `;
          block.content.items.forEach(item => {
            contentHTML += `
                <tr>
                    <td style="padding: 5px 0 5px 10px; font-family: Arial, Helvetica, sans-serif;"><span style="color: #FF9100; font-weight: bold;">•</span> ${item}</td>
                </tr>
            `;
          });
          contentHTML += `
            </table>
          `;
          break;

        case 'image':
          if (block.content.url && block.content.isLoaded) {
            const alignStyle = block.content.align === 'left' ? 'left' :
                             block.content.align === 'right' ? 'right' : 'center';
            contentHTML += `
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0;">
                <tr>
                  <td style="text-align: ${alignStyle};">
                    <img src="${block.content.url}" alt="${block.content.alt || 'Image'}" style="max-width: ${block.content.width || 600}px; width: 100%; height: auto; display: block; ${alignStyle === 'center' ? 'margin: 0 auto;' : ''}" />
                  </td>
                </tr>
              </table>
            `;
          }
          break;
      }
    });

    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #ced6e5;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ced6e5; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #FFFFFF; max-width: 600px;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #253551; padding: 30px 20px; text-align: center;">
                            <img src="https://images.squarespace-cdn.com/content/v1/5ea0274b6f26ff780c56bac1/1590580355971-SZIOHLI6EERJH234U7LS/logo_pocket.png?format=1500w" alt="Pocket Hearing" style="max-width: 200px; height: auto; margin: 0 0 20px 0; display: block; margin-left: auto; margin-right: auto;" />
                            <h1 style="color: #FFFFFF; margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 24px; font-weight: bold; line-height: 1.3;">
                                ${headerTitle}
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 30px 25px; color: #2A2829; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6;">
                            
                            <p style="margin: 0 0 15px 0;">${greeting}</p>
                            
                            ${contentHTML}
                            
                        </td>
                    </tr>
                    
                    <!-- Social Section -->
                    <tr>
                        <td style="background-color: #ced6e5; padding: 25px; text-align: center;">
                            <h3 style="color: #253551; font-family: Arial, Helvetica, sans-serif; margin: 0 0 15px 0; font-size: 18px; font-weight: bold;">
                                Connect With Us
                            </h3>

                            <table width="100%" cellpadding="10" cellspacing="0" border="0">
                                <tr>
                                    <td style="text-align: center; font-family: Arial, Helvetica, sans-serif;">
                                        <a href="https://www.facebook.com/pockethearing" style="color: #253551; text-decoration: none; font-size: 14px; display: block; margin-bottom: 10px;">
                                            <strong>Facebook</strong><br/>
                                            Latest news and hearing health tips
                                        </a>
                                        <a href="https://www.youtube.com/@pockethearing" style="color: #253551; text-decoration: none; font-size: 14px; display: block;">
                                            <strong>YouTube</strong><br/>
                                            Educational videos and product guides
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Closing -->
                    <tr>
                        <td style="padding: 30px 25px 0 25px; color: #2A2829; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6;">
                            
                            <p style="margin: 0 0 15px 0;">${closingMessage}</p>
                            
                            <p style="margin: 30px 0 5px 0;">Best regards,</p>
                            
                            <p style="margin: 0;">
                                <strong>${signatureName}</strong><br/>
                                Pocket Hearing
                            </p>
                            
                            <p style="margin: 15px 0 0 0; font-size: 14px;">
                                <strong>Phone:</strong> 0800 331 7006<br/>
                                <strong>Email:</strong> <a href="mailto:contact@pockethearing.com" style="color: #253551; text-decoration: none;">contact@pockethearing.com</a><br/>
                                <strong>Website:</strong> <a href="https://www.pockethearing.com" style="color: #253551; text-decoration: none;">https://www.pockethearing.com</a><br/>
                                <strong>Book a Consultation:</strong> <a href="https://app.squarespacescheduling.com/schedule/a923d61b/appointment/20545940/calendar/3969702?appointmentTypeIds[]=20545940" style="color: #253551; text-decoration: none;">Schedule with Zoe</a>
                            </p>
                            
                        </td>
                    </tr>
                    ${psMessage ? `
                    <!-- P.S. Box -->
                    <tr>
                        <td style="padding: 0 25px 30px 25px;">
                            <table width="100%" cellpadding="15" cellspacing="0" border="0" style="background-color: #ced6e5; border-left: 4px solid #ED1C24; margin: 25px 0 0 0;">
                                <tr>
                                    <td>
                                        <p style="margin: 0; font-size: 14px; font-family: Arial, Helvetica, sans-serif;"><strong>P.S.</strong> ${psMessage}</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    ` : ''}
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #253551; color: #FFFFFF; padding: 20px; text-align: center; font-size: 12px; font-family: Arial, Helvetica, sans-serif;">
                            <p style="margin: 0 0 10px 0;">© 2025 Pocket Hearing. All rights reserved.</p>
                            <p style="margin: 0;">You're receiving this email because you're a valued customer of Pocket Hearing.</p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

    return fullHTML;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateHTML());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderBlockEditor = (block) => {
    const isExpanded = expandedBlock === block.id;
    
    return (
      <div key={block.id} style={{
        background: 'white',
        border: '2px solid #ced6e5',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isExpanded ? '15px' : '0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setExpandedBlock(isExpanded ? null : block.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#253551',
                padding: '5px'
              }}
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            <strong style={{ color: '#ED1C24' }}>
              {blockTypes.find(t => t.value === block.type)?.label}
            </strong>
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <button
              onClick={() => moveBlock(block.id, 'up')}
              style={{
                background: '#ced6e5',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              ↑
            </button>
            <button
              onClick={() => moveBlock(block.id, 'down')}
              style={{
                background: '#ced6e5',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              ↓
            </button>
            <button
              onClick={() => deleteBlock(block.id)}
              style={{
                background: '#ff4444',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {isExpanded && (
          <div>
            {block.type === 'paragraph' && (
              <textarea
                value={block.content.text}
                onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                placeholder="Enter paragraph text..."
                style={{
                  width: '100%',
                  minHeight: '80px',
                  padding: '10px',
                  border: '1px solid #ced6e5',
                  borderRadius: '4px',
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '14px'
                }}
              />
            )}

            {block.type === 'heading2' && (
              <input
                type="text"
                value={block.content.text}
                onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                placeholder="Enter heading text..."
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ced6e5',
                  borderRadius: '4px',
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              />
            )}

            {block.type === 'heading3' && (
              <input
                type="text"
                value={block.content.text}
                onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                placeholder="Enter sub-heading text..."
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ced6e5',
                  borderRadius: '4px',
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              />
            )}

            {block.type === 'highlight' && (
              <>
                <input
                  type="text"
                  value={block.content.title}
                  onChange={(e) => updateBlock(block.id, { ...block.content, title: e.target.value })}
                  placeholder="Highlight title..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced6e5',
                    borderRadius: '4px',
                    marginBottom: '10px',
                    fontWeight: 'bold'
                  }}
                />
                <textarea
                  value={block.content.text}
                  onChange={(e) => updateBlock(block.id, { ...block.content, text: e.target.value })}
                  placeholder="Highlight text..."
                  style={{
                    width: '100%',
                    minHeight: '60px',
                    padding: '10px',
                    border: '1px solid #ced6e5',
                    borderRadius: '4px'
                  }}
                />
              </>
            )}

            {block.type === 'cta' && (
              <>
                <input
                  type="text"
                  value={block.content.title}
                  onChange={(e) => updateBlock(block.id, { ...block.content, title: e.target.value })}
                  placeholder="CTA title..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced6e5',
                    borderRadius: '4px',
                    marginBottom: '10px',
                    fontWeight: 'bold'
                  }}
                />
                <input
                  type="text"
                  value={block.content.buttonText}
                  onChange={(e) => updateBlock(block.id, { ...block.content, buttonText: e.target.value })}
                  placeholder="Button text..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced6e5',
                    borderRadius: '4px',
                    marginBottom: '10px'
                  }}
                />
                <input
                  type="url"
                  value={block.content.buttonUrl}
                  onChange={(e) => updateBlock(block.id, { ...block.content, buttonUrl: e.target.value })}
                  placeholder="Button URL..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced6e5',
                    borderRadius: '4px'
                  }}
                />
              </>
            )}

            {block.type === 'button' && (
              <>
                <select
                  value={block.content.color}
                  onChange={(e) => updateBlock(block.id, { ...block.content, color: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced6e5',
                    borderRadius: '4px',
                    marginBottom: '10px'
                  }}
                >
                  <option value="cyan">Cyan (Secondary)</option>
                  <option value="purple">Purple (Primary)</option>
                </select>
                <input
                  type="text"
                  value={block.content.text}
                  onChange={(e) => updateBlock(block.id, { ...block.content, text: e.target.value })}
                  placeholder="Button text..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced6e5',
                    borderRadius: '4px',
                    marginBottom: '10px'
                  }}
                />
                <input
                  type="url"
                  value={block.content.url}
                  onChange={(e) => updateBlock(block.id, { ...block.content, url: e.target.value })}
                  placeholder="Button URL..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced6e5',
                    borderRadius: '4px'
                  }}
                />
              </>
            )}

            {block.type === 'dualButton' && (
              <>
                <div style={{ marginBottom: '15px', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
                  <strong style={{ display: 'block', marginBottom: '10px', color: '#ED1C24' }}>Primary Button (Purple)</strong>
                  <input
                    type="text"
                    value={block.content.button1Text}
                    onChange={(e) => updateBlock(block.id, { ...block.content, button1Text: e.target.value })}
                    placeholder="Button 1 text..."
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ced6e5',
                      borderRadius: '4px',
                      marginBottom: '10px'
                    }}
                  />
                  <input
                    type="url"
                    value={block.content.button1Url}
                    onChange={(e) => updateBlock(block.id, { ...block.content, button1Url: e.target.value })}
                    placeholder="Button 1 URL..."
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ced6e5',
                      borderRadius: '4px'
                    }}
                  />
                </div>
                <div style={{ padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
                  <strong style={{ display: 'block', marginBottom: '10px', color: '#FF9100' }}>Secondary Button (Cyan)</strong>
                  <input
                    type="text"
                    value={block.content.button2Text}
                    onChange={(e) => updateBlock(block.id, { ...block.content, button2Text: e.target.value })}
                    placeholder="Button 2 text..."
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ced6e5',
                      borderRadius: '4px',
                      marginBottom: '10px'
                    }}
                  />
                  <input
                    type="url"
                    value={block.content.button2Url}
                    onChange={(e) => updateBlock(block.id, { ...block.content, button2Url: e.target.value })}
                    placeholder="Button 2 URL..."
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ced6e5',
                      borderRadius: '4px'
                    }}
                  />
                </div>
              </>
            )}

            {block.type === 'bulletList' && (
              <div>
                {block.content.items.map((item, index) => (
                  <div key={index} style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newItems = [...block.content.items];
                        newItems[index] = e.target.value;
                        updateBlock(block.id, { items: newItems });
                      }}
                      placeholder="Bullet point..."
                      style={{
                        flex: 1,
                        padding: '10px',
                        border: '1px solid #ced6e5',
                        borderRadius: '4px'
                      }}
                    />
                    <button
                      onClick={() => {
                        const newItems = block.content.items.filter((_, i) => i !== index);
                        updateBlock(block.id, { items: newItems });
                      }}
                      style={{
                        background: '#ff4444',
                        color: 'white',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    updateBlock(block.id, { items: [...block.content.items, ''] });
                  }}
                  style={{
                    background: '#FF9100',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <Plus size={16} /> Add Item
                </button>
              </div>
            )}

            {block.type === 'image' && (
              <div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Image URL</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="url"
                      value={block.content.url}
                      onChange={(e) => updateBlock(block.id, { ...block.content, url: e.target.value, isLoaded: false, error: '' })}
                      placeholder="Enter image URL (https://...)"
                      style={{
                        flex: 1,
                        padding: '10px',
                        border: '1px solid #ced6e5',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                    <button
                      onClick={() => loadImagePreview(block.id, block.content.url)}
                      disabled={block.content.isLoading}
                      style={{
                        background: block.content.isLoading ? '#999' : '#FF9100',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        cursor: block.content.isLoading ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold',
                        minWidth: '100px'
                      }}
                    >
                      {block.content.isLoading ? 'Loading...' : 'Preview'}
                    </button>
                  </div>
                  {block.content.error && (
                    <p style={{ margin: '5px 0 0 0', color: '#ff4444', fontSize: '13px' }}>
                      ⚠️ {block.content.error}
                    </p>
                  )}
                </div>

                {block.content.isLoaded && block.content.url && (
                  <>
                    <div style={{
                      marginBottom: '15px',
                      padding: '15px',
                      background: '#f5f5f5',
                      borderRadius: '8px',
                      border: '2px solid #ced6e5'
                    }}>
                      <img
                        src={block.content.url}
                        alt={block.content.alt || 'Preview'}
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          display: 'block',
                          margin: '0 auto',
                          borderRadius: '4px'
                        }}
                      />
                      {block.content.imageDimensions && (
                        <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#666', textAlign: 'center' }}>
                          Original: {block.content.imageDimensions.width} × {block.content.imageDimensions.height}px
                        </p>
                      )}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Alt Text (for accessibility)</label>
                      <input
                        type="text"
                        value={block.content.alt}
                        onChange={(e) => updateBlock(block.id, { ...block.content, alt: e.target.value })}
                        placeholder="Describe the image..."
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #ced6e5',
                          borderRadius: '4px',
                          fontSize: '14px'
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Width (px)</label>
                        <input
                          type="number"
                          value={block.content.width}
                          onChange={(e) => updateBlock(block.id, { ...block.content, width: parseInt(e.target.value) || 600 })}
                          min="100"
                          max="600"
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ced6e5',
                            borderRadius: '4px',
                            fontSize: '14px'
                          }}
                        />
                      </div>

                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Alignment</label>
                        <select
                          value={block.content.align}
                          onChange={(e) => updateBlock(block.id, { ...block.content, align: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ced6e5',
                            borderRadius: '4px',
                            fontSize: '14px'
                          }}
                        >
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {!block.content.isLoaded && !block.content.error && !block.content.isLoading && (
                  <div style={{
                    padding: '40px',
                    textAlign: 'center',
                    background: '#f5f5f5',
                    borderRadius: '8px',
                    border: '2px dashed #ced6e5',
                    color: '#666'
                  }}>
                    <p style={{ margin: 0 }}>Enter an image URL above and click "Preview" to load the image</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{
        background: '#253551',
        color: 'white',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>PH Email Builder</h1>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setView('builder')}
            style={{
              background: view === 'builder' ? '#FF9100' : 'transparent',
              color: 'white',
              border: '2px solid white',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Builder
          </button>
          <button
            onClick={() => setView('preview')}
            style={{
              background: view === 'preview' ? '#FF9100' : 'transparent',
              color: 'white',
              border: '2px solid white',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <Eye size={16} /> Preview
          </button>
          <button
            onClick={() => setView('code')}
            style={{
              background: view === 'code' ? '#FF9100' : 'transparent',
              color: 'white',
              border: '2px solid white',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <Code size={16} /> HTML
          </button>
          <button
            onClick={handleCopy}
            style={{
              background: '#ED1C24',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <Copy size={16} /> {copied ? 'Copied!' : 'Copy HTML'}
          </button>
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        {view === 'builder' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* AI Generation Section */}
            <div style={{ 
              background: 'linear-gradient(135deg, #ED1C24 0%, #253551 100%)', 
              padding: '25px', 
              borderRadius: '8px', 
              marginBottom: '20px',
              color: 'white'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <Sparkles size={24} color="#FF9100" />
                <h2 style={{ margin: 0, fontSize: '20px' }}>AI Email Generator</h2>
              </div>
              
              <p style={{ margin: '0 0 15px 0', opacity: 0.9 }}>
                Describe the email you want to create and let AI generate it for you
              </p>

              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey) {
                    generateWithAI();
                  }
                }}
                placeholder="Example: Create an email announcing a special promotion on our latest hearing aids. Include benefits and features, with a limited-time discount offer."
                disabled={isGenerating}
                style={{
                  width: '100%',
                  minHeight: '100px',
                  padding: '15px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: '4px',
                  fontSize: '14px',
                  marginBottom: '15px',
                  fontFamily: 'Arial, sans-serif',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  resize: 'vertical'
                }}
              />

              {aiError && (
                <div style={{
                  background: '#ff4444',
                  padding: '10px 15px',
                  borderRadius: '4px',
                  marginBottom: '15px',
                  fontSize: '14px'
                }}>
                  ⚠️ {aiError}
                </div>
              )}

              <button
                onClick={generateWithAI}
                disabled={isGenerating || !aiPrompt.trim()}
                style={{
                  background: isGenerating ? '#999' : '#FF9100',
                  color: 'white',
                  border: 'none',
                  padding: '12px 30px',
                  borderRadius: '4px',
                  cursor: isGenerating ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  justifyContent: 'center'
                }}
              >
                {isGenerating ? (
                  <>
                    <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} />
                    Generating Email...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    Generate Email with AI
                  </>
                )}
              </button>

              <p style={{ margin: '10px 0 0 0', fontSize: '12px', opacity: 0.7 }}>
                💡 Tip: Press Ctrl+Enter to generate
              </p>
            </div>

            {/* Basic Settings */}
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
              <h2 style={{ color: '#253551', marginTop: 0 }}>Email Settings</h2>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Subject Line</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Email subject..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced6e5',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Header Title</label>
                <input
                  type="text"
                  value={headerTitle}
                  onChange={(e) => setHeaderTitle(e.target.value)}
                  placeholder="Main header title..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced6e5',
                    borderRadius: '4px',
                    fontSize: '14px',
                    marginBottom: headerTitle ? '8px' : '0'
                  }}
                />
                {headerTitle && (
                  <div style={{
                    background: '#253551',
                    padding: '15px',
                    borderRadius: '4px',
                    textAlign: 'center'
                  }}>
                    <div
                      style={{
                        color: '#FFFFFF',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        lineHeight: '1.3'
                      }}
                      dangerouslySetInnerHTML={{ __html: headerTitle }}
                    />
                    <div style={{
                      fontSize: '11px',
                      color: 'rgba(255,255,255,0.6)',
                      marginTop: '8px'
                    }}>
                      Preview
                    </div>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Greeting</label>
                <input
                  type="text"
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  placeholder="Dear Customer,"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced6e5',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            {/* Content Blocks */}
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
              <h2 style={{ color: '#253551', marginTop: 0 }}>Email Content</h2>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Add Content Block:</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {blockTypes.map(type => (
                    <button
                      key={type.value}
                      onClick={() => addBlock(type.value)}
                      style={{
                        background: '#FF9100',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '14px'
                      }}
                    >
                      <Plus size={16} /> {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {contentBlocks.length === 0 ? (
                <div style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: '#666',
                  background: '#f5f5f5',
                  borderRadius: '8px'
                }}>
                  <p>No content blocks yet. Use AI Generator above or add blocks manually!</p>
                </div>
              ) : (
                <div>
                  {contentBlocks.map(block => renderBlockEditor(block))}
                </div>
              )}
            </div>

            {/* Closing Settings */}
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
              <h2 style={{ color: '#253551', marginTop: 0 }}>Email Closing</h2>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Closing Message</label>
                <textarea
                  value={closingMessage}
                  onChange={(e) => setClosingMessage(e.target.value)}
                  placeholder="If you have any questions..."
                  style={{
                    width: '100%',
                    minHeight: '60px',
                    padding: '10px',
                    border: '1px solid #ced6e5',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Signature Name</label>
                <select
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced6e5',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  <option value="Zoe Blake">Zoe Blake</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>P.S. Message (Optional)</label>
                <textarea
                  value={psMessage}
                  onChange={(e) => setPsMessage(e.target.value)}
                  placeholder="P.S. Remember..."
                  style={{
                    width: '100%',
                    minHeight: '60px',
                    padding: '10px',
                    border: '1px solid #ced6e5',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {view === 'preview' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
              <iframe
                srcDoc={generateHTML()}
                style={{
                  width: '100%',
                  minHeight: '800px',
                  border: 'none'
                }}
                title="Email Preview"
              />
            </div>
          </div>
        )}

        {view === 'code' && (
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              background: 'white',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <pre style={{
                margin: 0,
                fontSize: '12px',
                fontFamily: 'Consolas, Monaco, monospace',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                color: '#333',
                maxHeight: '600px',
                overflow: 'auto'
              }}>
                {generateHTML()}
              </pre>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        textarea::placeholder {
          color: rgba(255, 255, 255, 0.7) !important;
          opacity: 1;
        }

        textarea:disabled::placeholder {
          color: rgba(255, 255, 255, 0.5) !important;
        }
      `}</style>
    </div>
  );
}