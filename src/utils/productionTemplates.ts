// Template data for production-ready email signatures
export interface ProductionTemplate {
  id: string;
  name: string;
  html: string;
}

export const productionTemplates: ProductionTemplate[] = [
  {
    id: 'modern-accent-bar',
    name: 'Modern Accent Bar',
    html: `<!-- Template 1: Modern Accent Bar -->
<table cellpadding="0" cellspacing="0" style="width:100%; max-width:600px; font-family:Arial, sans-serif; font-size:14px; color:#333333;">
  <tr>
    <td style="padding:20px; border-left: 4px solid #4F46E5; background-color:#F9FAFB;">
      <table cellpadding="0" cellspacing="0" style="width:100%;">
        <tr>
          <td style="width:87px; padding-right:15px; vertical-align:top;" rowspan="2">
            <img src="[LOGO_URL]" alt="Company Logo" width="87" height="113" style="display:block;">
          </td>
          <td style="padding-bottom:10px;">
            <div style="font-size:18px; font-weight:bold; color:#111827;">[FULL_NAME]</div>
            <div style="font-size:14px; color:#4B5563;">[ROLE]</div>
            <div style="font-size:14px; color:#4F46E5; font-weight:bold; padding-top:5px;">[COMPANY]</div>
          </td>
        </tr>
        <tr>
          <td>
            <table cellpadding="0" cellspacing="0" style="width:100%;">
              <tr>
                <td style="padding-right:15px; padding-bottom:8px;">
                  <span style="color:#4B5563;">Email:</span>
                  <a href="mailto:[EMAIL]" style="color:#4F46E5; text-decoration:none;">[EMAIL]</a>
                </td>
              </tr>
              <tr>
                <td style="padding-right:15px;">
                  <span style="color:#4B5563;">Phone:</span>
                  <span style="color:#111827;">[PHONE]</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`
  },
  {
    id: 'minimalist-centered',
    name: 'Minimalist Centered Layout',
    html: `<!-- Template 2: Minimalist Centered Layout -->
<table cellpadding="0" cellspacing="0" style="width:100%; max-width:600px; font-family:Arial, sans-serif; font-size:14px; color:#333333;">
  <tr>
    <td style="text-align:center; padding:25px; background-color:#FFFFFF; border:1px solid #E5E7EB;">
      <table cellpadding="0" cellspacing="0" style="margin:0 auto; width:auto;">
        <tr>
          <td style="padding-right:20px; vertical-align:top;">
            <img src="[LOGO_URL]" alt="Company Logo" width="87" height="113" style="display:block;">
          </td>
          <td style="text-align:left; vertical-align:top;">
            <div style="font-size:18px; font-weight:bold; color:#111827; margin-bottom:5px;">[FULL_NAME]</div>
            <div style="font-size:14px; color:#4B5563; margin-bottom:15px;">[ROLE] | <span style="color:#4F46E5;">[COMPANY]</span></div>
            <table cellpadding="0" cellspacing="0" style="width:100%;">
              <tr>
                <td style="padding-bottom:8px;">
                  <a href="mailto:[EMAIL]" style="color:#4F46E5; text-decoration:none;">[EMAIL]</a>
                </td>
              </tr>
              <tr>
                <td>
                  <span style="color:#111827;">[PHONE]</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`
  },
  {
    id: 'dual-tone-split',
    name: 'Dual Tone Split Background',
    html: `<!-- Template 3: Dual Tone Split Background -->
<table cellpadding="0" cellspacing="0" style="width:100%; max-width:600px; font-family:Arial, sans-serif; font-size:14px;">
  <tr>
    <td style="background-color:#4F46E5;">
      <table cellpadding="0" cellspacing="0" style="width:100%;">
        <tr>
          <td style="width:30%; padding:20px; vertical-align:top;">
            <img src="[LOGO_URL]" alt="Company Logo" width="87" height="113" style="display:block;">
          </td>
          <td style="width:70%; padding:20px; background-color:#FFFFFF; color:#333333;">
            <div style="font-size:18px; font-weight:bold; color:#111827; margin-bottom:5px;">[FULL_NAME]</div>
            <div style="font-size:14px; color:#4B5563; margin-bottom:15px;">[ROLE]</div>
            <div style="font-size:14px; color:#4F46E5; font-weight:bold; margin-bottom:15px;">[COMPANY]</div>
            <table cellpadding="0" cellspacing="0" style="width:100%;">
              <tr>
                <td style="padding-bottom:8px;">
                  <span style="color:#4B5563;">Email:</span>
                  <a href="mailto:[EMAIL]" style="color:#4F46E5; text-decoration:none;">[EMAIL]</a>
                </td>
              </tr>
              <tr>
                <td>
                  <span style="color:#4B5563;">Phone:</span>
                  <span style="color:#111827;">[PHONE]</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`
  },
  {
    id: 'icon-contact-strip',
    name: 'Icon-Focused Contact Strip',
    html: `<!-- Template 4: Icon-Focused Contact Strip -->
<table cellpadding="0" cellspacing="0" style="width:100%; max-width:600px; font-family:Arial, sans-serif; font-size:14px; color:#333333;">
  <tr>
    <td style="padding:20px; background-color:#F9FAFB;">
      <table cellpadding="0" cellspacing="0" style="width:100%;">
        <tr>
          <td style="width:87px; padding-right:20px; vertical-align:top;" rowspan="4">
            <img src="[LOGO_URL]" alt="Company Logo" width="87" height="113" style="display:block;">
          </td>
          <td colspan="3" style="padding-bottom:15px;">
            <div style="font-size:18px; font-weight:bold; color:#111827;">[FULL_NAME]</div>
            <div style="font-size:14px; color:#4B5563;">[ROLE] at <span style="color:#4F46E5; font-weight:bold;">[COMPANY]</span></div>
          </td>
        </tr>
        <tr>
          <td style="width:24px; padding-right:10px; vertical-align:top; padding-top:3px;">
            <div style="width:16px; height:16px; background-color:#4F46E5; border-radius:50%;"></div>
          </td>
          <td style="padding-right:20px; padding-bottom:10px;">
            <a href="mailto:[EMAIL]" style="color:#4F46E5; text-decoration:none;">[EMAIL]</a>
          </td>
          <td style="vertical-align:top;"></td>
        </tr>
        <tr>
          <td style="width:24px; padding-right:10px; vertical-align:top; padding-top:3px;">
            <div style="width:16px; height:16px; background-color:#10B981; border-radius:50%;"></div>
          </td>
          <td style="padding-right:20px; padding-bottom:10px;">
            <span style="color:#111827;">[PHONE]</span>
          </td>
          <td style="vertical-align:top;"></td>
        </tr>
        <tr>
          <td style="width:24px; padding-right:10px; vertical-align:top; padding-top:3px;">
            <div style="width:16px; height:16px; background-color:#8B5CF6; border-radius:50%;"></div>
          </td>
          <td>
            <span style="color:#4B5563;">[COMPANY]</span>
          </td>
          <td style="vertical-align:top;"></td>
        </tr>
      </table>
    </td>
  </tr>
</table>`
  },
  {
    id: 'bold-header-style',
    name: 'Bold Color Header Style',
    html: `<!-- Template 5: Bold Color Header Style -->
<table cellpadding="0" cellspacing="0" style="width:100%; max-width:600px; font-family:Arial, sans-serif; font-size:14px; color:#333333;">
  <tr>
    <td>
      <table cellpadding="0" cellspacing="0" style="width:100%;">
        <tr>
          <td style="height:6px; background: linear-gradient(90deg, #4F46E5 0%, #8B5CF6 100%);"></td>
        </tr>
      </table>
      <table cellpadding="0" cellspacing="0" style="width:100%; background-color:#FFFFFF;">
        <tr>
          <td style="padding:20px;">
            <table cellpadding="0" cellspacing="0" style="width:100%;">
              <tr>
                <td style="width:87px; padding-right:20px; vertical-align:top;" rowspan="2">
                  <div style="position:relative;">
                    <img src="[LOGO_URL]" alt="Company Logo" width="87" height="113" style="display:block;">
                    <div style="position:absolute; bottom:0; left:0; right:0; height:6px; background: linear-gradient(90deg, #4F46E5 0%, #8B5CF6 100%);"></div>
                  </div>
                </td>
                <td>
                  <div style="font-size:18px; font-weight:bold; color:#111827; margin-bottom:5px;">[FULL_NAME]</div>
                  <div style="font-size:14px; color:#4B5563; margin-bottom:15px;">[ROLE]</div>
                  <div style="font-size:14px; color:#8B5CF6; font-weight:bold; margin-bottom:15px;">[COMPANY]</div>
                </td>
              </tr>
              <tr>
                <td>
                  <table cellpadding="0" cellspacing="0" style="width:100%;">
                    <tr>
                      <td style="width:50%; padding-right:15px; padding-bottom:8px;">
                        <div style="display:inline-block; width:16px; height:16px; background-color:#4F46E5; border-radius:50%; margin-right:8px;"></div>
                        <a href="mailto:[EMAIL]" style="color:#4F46E5; text-decoration:none;">[EMAIL]</a>
                      </td>
                      <td style="width:50%; padding-bottom:8px;">
                        <div style="display:inline-block; width:16px; height:16px; background-color:#10B981; border-radius:50%; margin-right:8px;"></div>
                        <span style="color:#111827;">[PHONE]</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`
  }
];