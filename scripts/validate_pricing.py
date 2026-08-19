from html.parser import HTMLParser
import json
from pathlib import Path

class JSONLDParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_jsonld = False
        self.buffer = []
        self.blocks = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self.in_jsonld = True
            self.buffer = []

    def handle_endtag(self, tag):
        if tag == "script" and self.in_jsonld:
            self.blocks.append("".join(self.buffer).strip())
            self.in_jsonld = False

    def handle_data(self, data):
        if self.in_jsonld:
            self.buffer.append(data)

html = Path("pricing.html").read_text(encoding="utf-8")
parser = JSONLDParser()
parser.feed(html)
parsed = [json.loads(block) for block in parser.blocks]
prices = [
    "$950", "$1,950", "$2,750", "$1,750", "$3,250", "$4,500",
    "$6,500–$7,500", "$9,000", "$1,250", "$950", "$300–$400 per SOP", "$1,250", "$750", "$1,200 /month"
]
missing = [price for price in prices if price not in html]
if missing:
    raise SystemExit(f"Missing visible prices: {missing}")
if html.count('class="pkg-badge">Tier') != 3:
    raise SystemExit("Expected exactly three training tiers")
if 'class="addon-name">Staff Training' in html or 'class="addon-price">From $750</div>\n <div class="addon-desc">On-site food safety training' in html:
    raise SystemExit("Obsolete staff training bolt-on remains")
print(f"validated_jsonld={len(parsed)}")
print(f"training_tiers={html.count('class=\"pkg-badge\">Tier')}")
print("obsolete_training_bolton=0")
print("pricing_validation=ok")
