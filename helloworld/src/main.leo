program salary_compare.aleo {
    // Define a struct for salary data
    struct SalaryData {
        industry: u32,
        experience: u32,
        salary: u64,
    }

    // Transition function to add salary data
    transition add_salary(
        industry: u32,
        experience: u32,
        salary: u64,
    ) -> SalaryData {
        return SalaryData {
            industry: industry,
            experience: experience,
            salary: salary,
        };
    }

    // Function to compare salary (simplified)
    // Returns 1 if salary is below average, 0 if above
    transition compare_salary(
        data: SalaryData,
        average: u64,
    ) -> u8 {
        return data.salary <= average ? 1u8 : 0u8;
    }
}
