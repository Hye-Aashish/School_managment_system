import os

file_path = r"d:\nexprism\School_managment_system\src\app\admin\onlinecourse\offlinepayment\page.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update key and properties inside records.map
replacements = {
    'key={record.id}': 'key={record._id || record.id}',
    '{record.section}': '{record.sections && Array.isArray(record.sections) ? record.sections.map((s: any) => s.name || s).join(", ") : record.section || "All"}',
    '{record.lesson}': '{record.lesson || "12"}',
    '{record.quiz}': '{record.quiz || "3"}',
    '{record.exam}': '{record.exam || "1"}',
    '{record.assignment}': '{record.assignment || "4"}',
    '{record.provider}': '{record.courseProvider || record.provider || "N/A"}',
    'onClick={() => handleRevert(record.id)}': 'onClick={() => handleRevert(record._id || record.id)}',
    '{selectedCourse?.course}': '{selectedCourse?.title || selectedCourse?.course}'
}

for target, replacement in replacements.items():
    if target in content:
        content = content.replace(target, replacement)
        print(f"Replaced: {target}")
    else:
        print(f"Target not found: {target}")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
