import re

try:
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract content between <script> tags
    # We focus on the main module or classic scripts
    scripts = re.findall(r'<script.*?>(.*?)</script>', content, re.DOTALL | re.IGNORECASE)
    
    with open('extracted.js', 'w', encoding='utf-8') as f:
        # Add some spacing to separate blocks
        f.write('\n// --- Script Block ---\n'.join(scripts))
        
    print(f"Extracted {len(scripts)} script blocks to extracted.js")

except Exception as e:
    print(f"Error: {e}")
