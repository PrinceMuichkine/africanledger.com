import os
from datetime import datetime
from urllib.parse import urljoin
import xml.etree.ElementTree as ET

# Base URL of your website
base_url = "https://www.africanledger.com"

# Directory containing your HTML files (adjust as needed)
html_dir = "app"

def generate_sitemap():
    urlset = ET.Element("urlset")
    urlset.set("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9")

    for root, dirs, files in os.walk(html_dir):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                # Create relative path
                rel_path = os.path.relpath(os.path.join(root, file), html_dir)
                # Convert Windows path separators to URL format
                rel_path = rel_path.replace(os.path.sep, '/')
                # Remove file extension
                rel_path = os.path.splitext(rel_path)[0]
                
                # Construct full URL
                full_url = urljoin(base_url, rel_path)

                url = ET.SubElement(urlset, "url")
                loc = ET.SubElement(url, "loc")
                loc.text = full_url
                lastmod = ET.SubElement(url, "lastmod")
                lastmod.text = datetime.now().strftime("%Y-%m-%d")
                
                # Set changefreq and priority based on the URL
                changefreq = ET.SubElement(url, "changefreq")
                priority = ET.SubElement(url, "priority")
                
                if rel_path == "":  # Homepage
                    changefreq.text = "daily"
                    priority.text = "1.0"
                elif "archive" in rel_path:
                    changefreq.text = "weekly"
                    priority.text = "0.8"
                else:
                    changefreq.text = "monthly"
                    priority.text = "0.5"

    tree = ET.ElementTree(urlset)
    tree.write("public/sitemap.xml", encoding="UTF-8", xml_declaration=True)

if __name__ == "__main__":
    generate_sitemap()